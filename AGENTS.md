# Repository Guidelines

## Project Structure & Module Organization

This Next.js 14 App Router project keeps page logic under `src/app`, with server and client components split by segment. Reusable UI sits in `src/components`, shared utilities in `src/lib`, runtime configuration in `src/config`, and types in `src/types`. Content lives in topic-based folders under `posts`, planning docs land in `documents`, static assets belong in `public`, automation scripts live in `scripts`, and `contentlayer.config.ts` stays aligned with the post frontmatter schema.

## Build, Test, and Development Commands

Run `pnpm install` to sync dependencies after cloning or pulling. Use `pnpm dev` for local development; it rebuilds Contentlayer on save at http://localhost:3000. `pnpm build` validates the production bundle, `pnpm start` serves the built output for smoke checks, `pnpm lint` covers ESLint plus TypeScript, and `pnpm upload-media` pushes `public/media/**` to S3 once credentials and prefixes are configured.

## Coding Style & Naming Conventions

Stick to TypeScript functional components with two-space indentation. Component files are PascalCase (`src/components/Hero.tsx`), hooks and helpers stay camelCase, and posts use kebab-case slugs such as `posts/ai/agent-tools.mdx`. Tailwind handles styling; Prettier with the Tailwind plugin keeps class orders stable, so run `pnpm lint --fix` and `pnpm prettier --write "src/**/*.{ts,tsx}"` before committing when you touch layout-heavy files.

## Testing Guidelines

There is no dedicated automated suite yet, so rely on `pnpm dev` for interactive checks and `pnpm build` to surface type or Contentlayer issues. When introducing tests, colocate `*.test.tsx` beside the component and document any setup quirks in the PR. Capture manual QA notes for navigation, RSS generation, and theme toggling before requesting review.

## Commit & Pull Request Guidelines

Commits follow short, present-tense messages like `add new post` or `update projects`, and should stay scoped to a single concern. Pull requests need a concise summary, linked issues or tasks, and screenshots or recordings for UI work. Call out manual verification steps and any media or content changes, especially if `pnpm upload-media` ran.

## Security & Configuration Tips

Keep `.env` entries out of version control and lean on the provided variables for local auth and API keys. Ensure post frontmatter keys (`title`, `description`, `publishedAt`, `tags`) match the shapes defined in `contentlayer.config.ts` to avoid build failures. Coordinate with maintainers before adjusting `scripts/uploadMedia.ts` or S3 paths to prevent breaking production syncs.
