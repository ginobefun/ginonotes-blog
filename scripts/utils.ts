import * as fs from 'fs'
import * as path from 'path'
import { config } from './config'

// 显示进度
export function showProgress(current: number, total: number, message: string = '处理进度'): void {
    const percentage = Math.round((current / total) * 100)
    const bar = '='.repeat(Math.floor(percentage / 2)) + '-'.repeat(50 - Math.floor(percentage / 2))
    process.stdout.write(`${message}: [${bar}] ${percentage}% (${current}/${total})\r`)
    if (current === total) {
        process.stdout.write('\n')
    }
}

// 验证文件
export function validateFile(filePath: string): { valid: boolean; reason?: string } {
    const ext = path.extname(filePath).toLowerCase()

    if (!Object.keys(config.mimeTypes).includes(ext)) {
        return { valid: false, reason: `不支持的文件类型：${ext}` }
    }

    try {
        const stats = fs.statSync(filePath)
        if (stats.size > config.maxFileSize) {
            return {
                valid: false,
                reason: `文件过大：${(stats.size / 1024 / 1024).toFixed(2)}MB（最大限制：${(config.maxFileSize / 1024 / 1024).toFixed(2)}MB）`
            }
        }
    } catch (error) {
        return { valid: false, reason: `无法读取文件：${filePath}` }
    }

    return { valid: true }
}

// 备份文件
export async function backupFile(filePath: string): Promise<string> {
    const date = new Date().toISOString().split('T')[0]
    const backupDir = path.join(process.cwd(), config.backup.dir, date)

    // 创建备份目录
    await fs.promises.mkdir(backupDir, { recursive: true })

    // 保持原始目录结构
    const relativePath = path.relative(process.cwd(), filePath)
    const backupPath = path.join(backupDir, relativePath)
    const backupFileDir = path.dirname(backupPath)

    // 创建备份文件的目录
    await fs.promises.mkdir(backupFileDir, { recursive: true })

    // 复制文件
    await fs.promises.copyFile(filePath, backupPath)

    return backupPath
}

// 清理旧备份
export async function cleanupOldBackups(): Promise<void> {
    const backupDir = path.join(process.cwd(), config.backup.dir)
    if (!fs.existsSync(backupDir)) return

    const now = new Date()
    const dirs = await fs.promises.readdir(backupDir)

    for (const dir of dirs) {
        const dirPath = path.join(backupDir, dir)
        const dirDate = new Date(dir)
        const daysDiff = (now.getTime() - dirDate.getTime()) / (1000 * 60 * 60 * 24)

        if (daysDiff > config.backup.keepDays) {
            await fs.promises.rm(dirPath, { recursive: true })
            console.log(`已删除旧备份：${dir}`)
        }
    }
}

// 分块处理数组
export async function processInChunks<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    options: {
        chunkSize?: number
        onProgress?: (current: number, total: number) => void
    } = {}
): Promise<R[]> {
    const { chunkSize = config.concurrency, onProgress } = options
    const results: R[] = []

    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize)
        const chunkResults = await Promise.all(chunk.map(processor))
        results.push(...chunkResults)

        if (onProgress) {
            onProgress(Math.min(i + chunkSize, items.length), items.length)
        }
    }

    return results
}

// 获取文件的 MIME 类型
export function getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase()
    return config.mimeTypes[ext as keyof typeof config.mimeTypes] || 'application/octet-stream'
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
} 