# GinoNotes Blog

这是我的个人博客网站 [ginonotes.com](https://ginonotes.com)，基于现代 Web 技术栈构建，专注于提供清新、整洁的阅读体验。

> 本项目基于 [ChangoMan/nextjs-mdx-blog](https://github.com/ChangoMan/nextjs-mdx-blog) 开发，感谢该项目提供的优秀起点。在此基础上，我们进行了大量定制化开发，包括界面重设计、功能增强和性能优化等。

## 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **内容**: [Contentlayer](https://contentlayer.dev/) (MDX)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **包管理**: [pnpm](https://pnpm.io/)

## 特性

- 🚀 基于 Next.js 14 App Router 和 React Server Components
- 📝 使用 MDX 编写文章，支持自定义组件
- 🎨 使用 Tailwind CSS 构建的响应式设计
- 🌙 支持深色模式
- 🔍 内置全文搜索功能
- 📊 文章目录自动生成
- 🖼️ 图片优化和渐进式加载
- 🎯 基于分类和标签的文章组织
- 📱 移动端优化

## 开发环境要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本

## 快速开始

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/ginonotes-blog.git
cd ginonotes-blog
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
.
├── app/                  # Next.js 应用路由
├── components/          # React 组件
├── content/            # MDX 文章和资源
├── lib/                # 工具函数和配置
├── public/             # 静态资源
├── styles/            # 全局样式
├── contentlayer.config.ts  # Contentlayer 配置
├── tailwind.config.ts     # Tailwind 配置
└── next.config.mjs        # Next.js 配置
```

## 写作指南

1. 在 `posts` 目录下创建新的 `.mdx` 文件
2. 添加必要的 frontmatter 信息：

   ```yaml
   ---
   title: 文章标题
   description: 文章描述
   date: 2024-01-01
   category: dev
   tags: tag1, tag2
   cover: /covers/example.jpg
   ---
   ```

3. 使用 MDX 语法编写文章内容

## 部署

项目使用 Vercel 进行部署。每次推送到 main 分支时会自动触发部署。

## 设计规范

查看 [design.md](./design.md) 了解项目的设计规范。

## 开发路线图

查看 [tasks.md](./tasks.md) 了解计划中的功能和改进。

## 媒体文件管理

本博客使用 Cloudflare R2 存储来管理媒体文件（图片、视频等）。提供了一个自动化工具来处理媒体文件的上传、替换和清理。

### 配置

1. 在 Cloudflare R2 控制台创建存储桶并获取以下信息：
   - Account ID
   - R2 Access Key ID
   - R2 Secret Access Key
   - Bucket Name
   - Public URL（如果配置了自定义域名）

2. 在项目根目录创建 `.env` 文件并填写以下配置：

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-public-bucket-url.r2.dev
```

### 使用方法

使用以下命令来管理媒体文件：

```bash
# 正常运行（上传新文件并清理未使用的文件）
pnpm upload-media

# 测试运行（不会实际修改文件）
pnpm upload-media --dry-run

# 跳过备份
pnpm upload-media --skip-backup

# 跳过清理未使用的文件
pnpm upload-media --skip-cleanup

# 显示帮助信息
pnpm upload-media --help
```

### 功能特点

1. 自动处理：
   - 自动扫描 MDX 文件中的媒体引用
   - 自动上传新的媒体文件到 R2
   - 自动更新 MDX 文件中的引用路径
   - 自动清理未使用的本地文件

2. 文件验证：
   - 支持的文件类型：jpg、jpeg、png、gif、webp、mp4、mov、webm
   - 文件大小限制：50MB
   - 自动检测文件类型和 MIME 类型

3. 安全特性：
   - 自动备份被修改或删除的文件
   - 保留最近 7 天的备份
   - 测试模式支持（--dry-run）
   - 详细的操作日志

4. 性能优化：
   - 并发处理提高效率
   - 可配置并发数量
   - 进度条显示

### 注意事项

1. 首次运行建议使用 `--dry-run` 选项进行测试
2. 建议在修改文件前进行备份
3. 被删除的文件可以在 `backups` 目录找到（保留 7 天）
4. 确保 `.env` 文件已正确配置且不要提交到 Git

### 配置文件

可以在 `scripts/config.ts` 中自定义以下配置：

```typescript
{
  // 允许的文件类型和 MIME 类型
  mimeTypes: { ... },
  // 文件大小限制（默认 50MB）
  maxFileSize: 50 * 1024 * 1024,
  // 并发上传数量
  concurrency: 3,
  // 缓存控制
  cacheControl: 'public, max-age=31536000',
  // 备份设置
  backup: {
    enabled: true,
    dir: 'backups',
    keepDays: 7,
  },
  // 路径设置
  paths: {
    public: 'public',
    images: 'images',
    covers: 'covers',
    posts: 'posts',
  }
}
```
