import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { config } from './config'
import {
    validateFile,
    backupFile,
    cleanupOldBackups,
    processInChunks,
    showProgress,
    getMimeType,
    formatFileSize
} from './utils'
import { config as dotenvConfig } from 'dotenv'
import { glob } from 'glob'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

// 将 fs 的回调函数转换为 Promise
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const unlinkAsync = promisify(fs.unlink)

// 解析命令行参数
const isDryRun = process.argv.includes('--dry-run')
const skipBackup = process.argv.includes('--skip-backup')
const skipCleanup = process.argv.includes('--skip-cleanup')

// 加载环境变量
dotenvConfig()

// 配置 R2 客户端
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME || ''
const PUBLIC_URL = process.env.R2_PUBLIC_URL || ''

// 检查文件是否已经存在于 R2
async function checkFileExists(key: string): Promise<boolean> {
    try {
        await s3Client.send(
            new HeadObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
            })
        )
        return true
    } catch (error) {
        return false
    }
}

// 上传文件到 R2
async function uploadToR2(filePath: string, key: string): Promise<string> {
    try {
        const fileContent = await readFileAsync(filePath)
        const contentType = getMimeType(filePath)

        if (isDryRun) {
            console.log(`[测试模式] 将上传文件：${filePath} -> ${key}`)
            return `${PUBLIC_URL}/${key}`
        }

        await s3Client.send(
            new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
                Body: fileContent,
                ContentType: contentType,
                CacheControl: config.cacheControl,
            })
        )

        return `${PUBLIC_URL}/${key}`
    } catch (error) {
        console.error(`上传文件失败：${filePath}`, error)
        throw new Error(`上传文件失败：${filePath}`)
    }
}

// 处理本地文件路径
async function processLocalFile(localPath: string): Promise<string> {
    // 如果路径以 http 开头，直接返回
    if (localPath.startsWith('http')) {
        return localPath
    }

    // 移除路径开头的斜杠
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath

    // 尝试在 public 目录下查找文件
    const absolutePath = path.join(process.cwd(), config.paths.public, cleanPath)
    if (!fs.existsSync(absolutePath)) {
        console.warn(`文件不存在：${absolutePath}`)
        return localPath
    }

    // 验证文件
    const validation = validateFile(absolutePath)
    if (!validation.valid) {
        console.warn(validation.reason)
        return localPath
    }

    // 备份文件
    if (config.backup.enabled && !skipBackup && !isDryRun) {
        const backupPath = await backupFile(absolutePath)
        console.log(`已备份文件：${backupPath}`)
    }

    const key = cleanPath
    const fileExists = await checkFileExists(key)

    if (!fileExists) {
        const r2Url = await uploadToR2(absolutePath, key)
        console.log(`已上传：${localPath} -> ${r2Url}`)

        // 删除本地文件
        if (!isDryRun) {
            await unlinkAsync(absolutePath)
            console.log(`已删除本地文件：${absolutePath}`)
        }
        return r2Url
    }

    return `${PUBLIC_URL}/${key}`
}

// 处理 MDX 文件中的媒体引用
async function processMdxFile(mdxPath: string): Promise<void> {
    console.log(`\n处理文件：${mdxPath}`)
    let content = await readFileAsync(mdxPath, 'utf-8')
    const processedFiles = new Set<string>()
    let hasChanges = false

    // 处理 frontmatter 中的 cover 字段
    const coverMatch = content.match(config.regex.cover)
    if (coverMatch) {
        const [fullMatch, startQuote, coverPath, endQuote] = coverMatch
        console.log(`找到 cover 字段：${coverPath}`)

        if (!processedFiles.has(coverPath) && !coverPath.startsWith('http')) {
            const r2Url = await processLocalFile(coverPath)
            if (r2Url !== coverPath) {
                const quotes = startQuote || ''
                content = content.replace(
                    fullMatch,
                    `cover: ${quotes}${r2Url}${quotes}`
                )
                processedFiles.add(coverPath)
                hasChanges = true
                console.log(`更新 cover 字段：${coverPath} -> ${r2Url}`)
            }
        }
    }

    // 处理正文中的图片和视频
    let match
    while ((match = config.regex.media.exec(content)) !== null) {
        const mediaPath = match[1] || match[2]
        if (processedFiles.has(mediaPath) || mediaPath.startsWith('http')) continue

        console.log(`找到媒体引用：${mediaPath}`)
        const r2Url = await processLocalFile(mediaPath)

        if (r2Url !== mediaPath) {
            content = content.replace(
                new RegExp(mediaPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                r2Url
            )
            processedFiles.add(mediaPath)
            hasChanges = true
            console.log(`更新媒体引用：${mediaPath} -> ${r2Url}`)
        }
    }

    if (hasChanges && !isDryRun) {
        await writeFileAsync(mdxPath, content, 'utf-8')
        console.log(`已更新文件：${mdxPath}`)
    } else {
        console.log(`文件无需更新：${mdxPath}`)
    }
}

// 清理未使用的媒体文件
async function cleanupUnusedMedia(): Promise<void> {
    if (skipCleanup) {
        console.log('\n跳过清理未使用的媒体文件')
        return
    }

    console.log('\n开始清理未使用的媒体文件...')

    // 收集所有媒体引用
    const references = await collectMediaReferences()
    console.log(`在 MDX 文件中找到 ${references.size} 个媒体引用`)

    // 获取 public/images 目录下的所有文件
    const imagesDir = path.join(process.cwd(), config.paths.public, config.paths.images)
    if (!fs.existsSync(imagesDir)) {
        console.log('images 目录不存在，无需清理')
        return
    }

    const files = await getAllFiles(imagesDir)
    console.log(`在 public/images 目录下找到 ${files.length} 个文件`)

    // 检查每个文件是否被引用
    let deletedCount = 0
    for (const file of files) {
        const relativePath = path.relative(path.join(process.cwd(), config.paths.public), file)
        if (!references.has(relativePath)) {
            if (isDryRun) {
                console.log(`[测试模式] 将删除未使用的文件：${relativePath}`)
                deletedCount++
                continue
            }

            try {
                // 备份文件
                if (config.backup.enabled && !skipBackup) {
                    await backupFile(file)
                }
                await unlinkAsync(file)
                console.log(`删除未使用的文件：${relativePath}`)
                deletedCount++
            } catch (error) {
                console.warn(`删除文件失败：${relativePath}`, error)
            }
        }
    }

    if (!isDryRun) {
        // 清理空目录
        await removeEmptyDirs(imagesDir)
    }

    console.log(`\n清理完成！共删除 ${deletedCount} 个未使用的文件`)
}

// 收集所有 MDX 文件中的媒体引用
async function collectMediaReferences(): Promise<Set<string>> {
    const references = new Set<string>()
    const mdxFiles = await glob(`${config.paths.posts}/**/*.mdx`)

    await processInChunks(mdxFiles, async (mdxPath) => {
        const content = await readFileAsync(mdxPath, 'utf-8')

        // 收集 cover 字段引用
        const coverMatch = content.match(config.regex.cover)
        if (coverMatch) {
            const coverPath = coverMatch[2]
            if (!coverPath.startsWith('http')) {
                const cleanPath = coverPath.startsWith('/') ? coverPath.slice(1) : coverPath
                references.add(cleanPath)
            }
        }

        // 收集正文中的媒体引用
        let match
        while ((match = config.regex.media.exec(content)) !== null) {
            const mediaPath = match[1] || match[2]
            if (!mediaPath.startsWith('http')) {
                const cleanPath = mediaPath.startsWith('/') ? mediaPath.slice(1) : mediaPath
                references.add(cleanPath)
            }
        }
    }, {
        onProgress: (current, total) => showProgress(current, total, '收集媒体引用')
    })

    return references
}

// 递归获取目录下的所有文件
async function getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = []
    const items = await fs.promises.readdir(dir, { withFileTypes: true })

    for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
            files.push(...await getAllFiles(fullPath))
        } else {
            files.push(fullPath)
        }
    }

    return files
}

// 清理空目录
async function removeEmptyDirs(dir: string): Promise<boolean> {
    const items = await fs.promises.readdir(dir, { withFileTypes: true })
    let isEmpty = true

    for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
            const subdirEmpty = await removeEmptyDirs(fullPath)
            if (!subdirEmpty) isEmpty = false
        } else {
            isEmpty = false
        }
    }

    if (isEmpty && dir !== path.join(process.cwd(), config.paths.public, config.paths.images)) {
        await fs.promises.rmdir(dir)
        console.log(`删除空目录：${path.relative(process.cwd(), dir)}`)
    }
    return isEmpty
}

async function main() {
    try {
        console.log(`运行模式：${isDryRun ? '测试模式' : '正常模式'}`)
        console.log(`备份功能：${skipBackup ? '已禁用' : '已启用'}`)
        console.log(`清理功能：${skipCleanup ? '已禁用' : '已启用'}`)

        // 检查环境变量
        if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME || !process.env.R2_PUBLIC_URL) {
            throw new Error('请在 .env 文件中设置所有必要的环境变量')
        }

        // 清理旧备份
        if (config.backup.enabled && !skipBackup && !isDryRun) {
            await cleanupOldBackups()
        }

        // 获取所有 MDX 文件
        const mdxFiles = await glob(`${config.paths.posts}/**/*.mdx`)
        console.log(`找到 ${mdxFiles.length} 个 MDX 文件`)

        // 处理每个 MDX 文件
        await processInChunks(mdxFiles, processMdxFile, {
            onProgress: (current, total) => showProgress(current, total, '处理 MDX 文件')
        })

        // 清理未使用的媒体文件
        await cleanupUnusedMedia()

        console.log('\n所有操作完成！')
    } catch (error) {
        console.error('发生错误：', error)
        process.exit(1)
    }
}

// 添加命令行帮助信息
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
使用方法：pnpm upload-media [选项]

选项：
  --dry-run       测试模式，不会实际修改文件
  --skip-backup   跳过文件备份
  --skip-cleanup  跳过清理未使用的文件
  --help, -h      显示帮助信息

示例：
  pnpm upload-media              # 正常运行
  pnpm upload-media --dry-run    # 测试运行，不会修改文件
  `)
    process.exit(0)
}

main() 