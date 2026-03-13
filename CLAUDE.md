# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

### Media Management

- `pnpm upload-media` - Upload local media files to Cloudflare R2 and update MDX references
- `pnpm upload-media --dry-run` - Test run without making changes
- `pnpm upload-media --skip-backup` - Skip creating backups
- `pnpm upload-media --skip-cleanup` - Skip cleaning up unused files

## Architecture

This is a Chinese-language personal blog built with Next.js 14 App Router. Key architectural components:

### Content Management

- **Posts**: Located in `posts/` directory, organized by category folders (`ai/`, `build/`, `dev/`, `reading/`)
- **Contentlayer**: Processes MDX files from `posts/` directory using configuration in `contentlayer.config.ts`
- **Post Schema**: Requires `title`, `date`, `category` fields; supports `description`, `tags`, `cover`, `slug`, `featured`
- **Routing**: Posts use computed URLs based on slug or filename, accessible via `/posts/[slug]`

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components organized by feature (home, post, navigation, common, ui)
- `src/lib/` - Utility functions, constants, routing logic, and metadata helpers
- `scripts/` - Build and deployment scripts, including media upload automation

### Key Features

- **Multi-theme support**: Dark/light mode via next-themes
- **Responsive design**: Tailwind CSS with mobile-first approach
- **Navigation**: Fixed sidebar on desktop (`lg:ml-64` offset), collapsible on mobile
- **Media handling**: Cloudflare R2 integration with automated upload and path replacement
- **SEO**: Comprehensive metadata, OpenGraph, Twitter cards, RSS feed, sitemap

### Styling Guidelines

- **Framework**: Tailwind CSS (avoid custom CSS)
- **Responsive**: Consider both desktop and mobile reading experience
- **Design**: Clean, tech-focused aesthetic prioritizing readability
- **Spacing**: Add spaces between Chinese and English/numbers

### Writing Guidelines

- **Language**: Chinese content with Chinese punctuation
- **File naming**: Use date + title format (e.g., `20240101_my_first_post.mdx`)
- **Content**: Use MDX format, preserve existing content when editing
- **Categories**: Organize posts into `ai/`, `build/`, `dev/`, `reading/` folders

### Environment Configuration

Required for media upload functionality:

- `CLOUDFLARE_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`

### Content Processing

- **Markdown**: Uses remark-gfm for GitHub Flavored Markdown
- **Code highlighting**: rehype-pretty-code with github-dark theme
- **Links**: Automatic heading anchors via rehype-autolink-headings
- **Slugs**: Auto-generated for heading navigation

## Design Context

### Users
中文技术读者，以 AI / 工程开发从业者为主。使用场景：PC 侧边栏浏览 + 移动端偶发访问。核心需求：快速判断文章价值，舒适地深度阅读长文。

### Brand Personality
**探索 · 创造 · 有趣** — 专业但不沉闷，有个人温度，像和一个有 15 年经验的工程师朋友聊天。

### Aesthetic Direction
- **色调**：保留墨蓝 (`#1a365d`) + 琥珀 (`#d97706`) + 纸白 (`#fefdfb`) 暖色系
- **参考站点**：leerob.com（极简内容优先）、rauno.me（精致细节）、impeccable.style（系统性设计原则）、vercel.com/blog（清晰信息层次）
- **反参考**：避免过度装饰（大量动效/渐变）、视觉噪音、低对比度灰色文字

### Design Principles
1. **内容优先** — 装饰服务于内容，不喧宾夺主；移除无信号价值的动效（如背景 blob）
2. **清晰的层次** — 标题、元信息、正文、辅助信息之间有明确的视觉分级
3. **克制的交互** — 悬停/激活状态用低饱和背景 + 品牌色文字，不用重填充块
4. **可读性第一** — 正文用 `text-gray-700 dark:text-gray-300`，而非过浅的 gray-600/gray-400
5. **无障碍合规** — 所有交互元素必须有 `focus-visible:ring-*`；动效必须尊重 `prefers-reduced-motion`
