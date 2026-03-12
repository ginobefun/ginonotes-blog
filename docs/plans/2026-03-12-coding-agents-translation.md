# Coding Agents Translation Post Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 发布一篇以转译为主的文章，介绍编程智能体如何重塑工程、产品与设计协作方式。

**Architecture:** 直接在现有 `posts/reading/ai/` 目录中新建一篇 MDX 文章，结构对齐当前博客中的译介稿模式。正文保留用户提供的转译内容，只补充元信息、来源链接、简短导读、排版修正和结尾收束，并通过构建验证 contentlayer 可以正常处理。

**Tech Stack:** MDX, Contentlayer, Next.js 14, pnpm

---

## Task 1: 准备文章元信息与结构

### Files for Task 2

- Create: `posts/reading/ai/20260312_how_coding_agents_are_reshaping_engineering_product_and_design.mdx`
- Reference: `posts/reading/ai/20260304_martin_fowler_humans_and_agents_on_the_loop.mdx`

### Step 1: 确定 frontmatter

写入以下字段：

- `title`
- `date`
- `description`
- `category`
- `tags`
- `slug`

### Step 2: 写入文章骨架

按以下顺序组织：

1. 原文链接
2. 简短导读
3. 转译正文
4. 简短结尾

### Step 3: 对齐中文排版规范

检查：

- 中文与英文之间空格
- 中文与数字之间空格
- 术语大小写
- 标题层级与列表格式

## Task 2: 验证内容可构建

### Files for Task 3

- Test: `posts/reading/ai/20260312_how_coding_agents_are_reshaping_engineering_product_and_design.mdx`

### Step 1: 运行构建

Run: `pnpm build`

Expected:

- Contentlayer 成功处理新文章
- MDX 无语法错误
- Next.js 构建通过

### Step 2: 检查编辑后文件的诊断

使用 `ReadLints` 查看是否有新增问题。

## Task 3: 总结变更

### Files

- Modify: `docs/plans/2026-03-12-coding-agents-translation-design.md`
- Modify: `docs/plans/2026-03-12-coding-agents-translation.md`

### Step 1: 输出简短说明

向用户说明：

- 新建了哪篇文章
- 补充了哪些内容
- 做了哪些格式化处理
- 是否完成构建验证
