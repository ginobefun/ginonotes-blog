export const config = {
    // 允许的文件类型和 MIME 类型映射
    mimeTypes: {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.mp4': 'video/mp4',
        '.mov': 'video/quicktime',
        '.webm': 'video/webm',
    },
    // 文件大小限制（50MB）
    maxFileSize: 50 * 1024 * 1024,
    // 并发上传数量
    concurrency: 3,
    // 缓存控制
    cacheControl: 'public, max-age=31536000',
    // 备份设置
    backup: {
        enabled: true,
        dir: 'backups',
        keepDays: 7, // 保留最近 7 天的备份
    },
    // 路径设置
    paths: {
        public: 'public',
        images: 'images',
        covers: 'covers',
        posts: 'posts',
    },
    // 正则表达式
    regex: {
        // frontmatter 中的 cover 字段
        cover: /cover:\s*(['"]?)([^'"}\s\n]+)(['"]?)/,
        // 正文中的媒体引用
        media: /!\[.*?\]\(([^)]+)\)|src=["']([^"']+)["']/g,
    },
} 