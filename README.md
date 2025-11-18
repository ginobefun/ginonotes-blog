# GinoNotes Blog

这是我的个人博客网站 [ginonotes.com](https://ginonotes.com)，基于现代 Web 技术栈构建，专注于提供清新、整洁的阅读体验。

> 本项目基于 [ChangoMan/nextjs-mdx-blog](https://github.com/ChangoMan/nextjs-mdx-blog) 开发，感谢该项目提供的优秀起点。在此基础上，我们进行了大量定制化开发，包括界面重设计、功能增强和性能优化等。

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **运行时**: [React 19](https://react.dev/)
- **语言**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **内容**: [Contentlayer2](https://github.com/timlrx/contentlayer2) (MDX)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **搜索**: [Fuse.js](https://fusejs.io/)
- **评论**: [Giscus](https://giscus.app/)
- **包管理**: [pnpm](https://pnpm.io/)

## 特性

### 核心功能
- 🚀 基于 Next.js 16 App Router + Turbopack 和 React 19
- 📝 使用 MDX 编写文章，支持自定义组件和代码高亮
- 🎨 使用 Tailwind CSS 4 构建的现代响应式设计
- 🌙 完善的深色/浅色主题切换，代码块双主题支持
- 🔍 强大的模糊搜索功能（Fuse.js + Cmd/Ctrl+K 快捷键）
- 💬 基于 GitHub Discussions 的 Giscus 评论系统
- 📊 智能文章目录（TOC）自动生成，支持锚点导航
- 🖼️ 图片优化和懒加载（AVIF/WebP）
- 🎯 基于分类和标签的文章组织
- 📱 完全响应式设计，优化的移动端体验

### 性能与 SEO
- ⚡️ Turbopack 加速构建和开发
- 🎯 自动生成 sitemap.xml 和 robots.txt
- 📈 集成 Vercel Analytics 和 Speed Insights
- 🔗 Open Graph 和 Twitter Card 支持
- 🌐 RSS 订阅源自动生成
- 🚀 静态站点生成（SSG）优化

### 开发体验
- 🛠️ TypeScript 严格模式
- 🎨 统一的组件设计系统（Button、Card 等）
- 📝 CLAUDE.md 配置支持 AI 辅助开发
- 🔄 自动媒体文件上传到 Cloudflare R2
- 🎭 自定义 404 和错误页面
- 📦 完善的错误边界处理

## 开发环境要求

- **Node.js**: 22.0 或更高版本（推荐使用 LTS 版本）
- **pnpm**: 9.0 或更高版本
- **操作系统**: macOS、Linux 或 Windows（WSL2）

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
├── src/
│   ├── app/                  # Next.js 16 App Router 应用路由
│   │   ├── posts/           # 文章详情页
│   │   ├── categories/      # 分类页面
│   │   ├── about/           # 关于页面
│   │   └── ...
│   ├── components/          # React 组件
│   │   ├── common/          # 通用组件（Container, Button, Card 等）
│   │   ├── home/            # 首页组件
│   │   ├── navigation/      # 导航组件（含搜索）
│   │   ├── post/            # 文章相关组件（含评论）
│   │   └── ui/              # UI 基础组件
│   └── lib/                 # 工具函数和配置
├── posts/                   # MDX 文章和资源
│   ├── ai/                  # AI 分类文章
│   ├── build/               # 构建分类文章
│   ├── dev/                 # 开发分类文章
│   └── reading/             # 阅读分类文章
├── public/                  # 静态资源
├── scripts/                 # 脚本工具（媒体上传等）
├── .contentlayer/           # Contentlayer 生成文件（自动生成）
├── contentlayer.config.ts   # Contentlayer2 配置
├── tailwind.config.ts       # Tailwind CSS 4 配置
├── next.config.js           # Next.js 16 配置
├── CLAUDE.md               # AI 辅助开发配置
└── package.json            # 项目依赖
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

## 功能配置

### 搜索功能

博客内置了基于 Fuse.js 的模糊搜索功能：

- **快捷键**: `Cmd/Ctrl + K` 打开搜索对话框
- **搜索范围**: 文章标题、描述、标签、分类
- **搜索算法**: 模糊匹配，支持中英文
- **权重配置**:
  - 标题：50%
  - 描述：30%
  - 标签：15%
  - 分类：5%

配置文件位于 `src/components/navigation/SearchDialog.tsx`。

### 评论系统

博客使用 Giscus 作为评论系统，基于 GitHub Discussions：

**配置步骤**:

1. 在你的 GitHub 仓库中启用 Discussions
2. 安装 [Giscus App](https://github.com/apps/giscus)
3. 访问 [giscus.app](https://giscus.app/) 获取配置
4. 更新 `src/components/post/Comments.tsx` 中的配置：

```tsx
<Giscus
  repo="your-username/your-repo"
  repoId="your-repo-id"
  category="Comments"
  categoryId="your-category-id"
  // ... 其他配置
/>
```

### 主题切换

博客支持深色和浅色主题，包括：

- **自动切换**: 根据系统主题自动切换
- **手动切换**: 通过导航栏主题切换按钮
- **代码高亮**: 代码块自动适配主题（github-light / github-dark）
- **持久化**: 主题选择保存在 localStorage

配置文件:
- 主题提供者: `src/app/providers.tsx`
- 代码高亮主题: `contentlayer.config.ts`

### 响应式宽度

博客针对不同页面类型优化了宽度：

| 页面类型 | 容器宽度 | 说明 |
|---------|---------|-----|
| 首页 | 1024px | 特色文章 + 最新文章列表 |
| 分类页 | 1152px | 文章卡片列表 |
| 关于页 | 1152px | 个人介绍 + 联系信息 |
| 文章页 | 1280px | 文章内容区 ~900px + 侧边栏 280px |

所有页面在小屏设备上自动适配为全宽。

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

## 版本更新日志

### v2.0.0 (2025-01)

**重大技术栈升级**：
- ⬆️ Next.js 14 → 16（启用 Turbopack）
- ⬆️ React 18 → 19
- ⬆️ TypeScript 5.3 → 5.9
- ⬆️ Tailwind CSS 3 → 4
- ⬆️ Node.js 20 → 22
- 🔄 Contentlayer → Contentlayer2（社区维护版）

**新功能**：
- ✨ 基于 Fuse.js 的模糊搜索（Cmd/Ctrl+K）
- 💬 Giscus 评论系统集成
- 🎨 代码块双主题支持（light/dark）
- 🎭 自定义 404 和错误页面
- 🎯 统一的组件设计系统（Button、Card）

**UI/UX 优化**：
- 📐 优化各页面宽度，提升宽屏阅读体验
  - 文章页：~900px 内容区
  - 分类/关于页：1152px
  - 首页：1024px
- 🎨 增强 Tailwind 主题系统（动画、阴影、间距）
- 🌈 改进色彩对比度，符合 WCAG AA 标准
- 📱 完善的响应式设计

**性能与 SEO**：
- 🚀 启用 Turbopack 加速构建
- 🤖 增强 robots.txt，屏蔽 AI 爬虫
- 🖼️ 图片优化（AVIF/WebP 优先）
- 📊 更好的缓存策略

**开发体验**：
- 🛠️ 完善的 TypeScript 类型支持
- 📝 CLAUDE.md 配置文件
- 🔧 改进的错误处理和边界

**Bug 修复**：
- 🐛 修复 React 重复 key 警告
- 🐛 修复 manifest.json CORS 错误
- 🐛 修复代码块提取导致的目录重复问题

---

### v1.0.0 (2024)

初始版本发布，基于 Next.js 14 和 Contentlayer 构建。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- 博客：[ginonotes.com](https://ginonotes.com)
- GitHub：[@ginobefun](https://github.com/ginobefun)
- 邮箱：hi@gino.bot
