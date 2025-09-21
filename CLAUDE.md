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
