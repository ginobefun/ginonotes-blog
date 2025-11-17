"use client"

import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { Post } from 'contentlayer2/generated'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { TableOfContents } from '@/components/post/TableOfContents'
import { PostRoute, createTagRoute } from '@/lib/routes'
import { useEffect, useState, useRef } from 'react'

interface ArticleLayoutProps {
  post: Post
  prevPost?: Post
  nextPost?: Post
}

export function ArticleLayout({ post, prevPost, nextPost }: ArticleLayoutProps) {
  const MDXContent = useMDXComponent(post.body.code)
  const contentRef = useRef<HTMLDivElement>(null)
  const [headings, setHeadings] = useState<{ level: number; text: string }[]>([])

  // 处理标签
  const tags = post.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || []

  // 提取标题
  useEffect(() => {
    if (!contentRef.current) return
    
    const elements = contentRef.current.querySelectorAll('h2, h3, h4')
    const headingsData = Array.from(elements).map(element => ({
      level: parseInt(element.tagName[1]),
      text: element.textContent || ''
    }))
    setHeadings(headingsData)
  }, [])

  return (
    <article className="min-h-screen w-full">
      {/* 文章容器 */}
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto">
          {/* 文章头部 */}
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={post.date} className="tabular-nums">
                {format(parseISO(post.date), 'yyyy年MM月dd日')}
              </time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-blue-400/60" />
                {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
              </span>
            </div>
          </header>

          {/* 文章布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8 items-start">
            {/* 文章内容 */}
            <div ref={contentRef} className="min-w-0 w-full prose prose-gray dark:prose-invert 
              prose-headings:scroll-mt-20
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-6 prose-h2:mt-12 lg:prose-h2:text-3xl
              prose-h3:text-xl prose-h3:font-medium prose-h3:mb-4 prose-h3:mt-8 lg:prose-h3:text-2xl
              prose-p:text-base prose-p:leading-7 prose-p:mb-6 lg:prose-p:text-lg lg:prose-p:leading-8
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-code:text-sm prose-code:font-normal lg:prose-code:text-base
              prose-pre:my-6 prose-pre:p-4 prose-pre:bg-gray-50 prose-pre:dark:bg-gray-800
              prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-4 prose-blockquote:italic
              sm:prose-pre:rounded-lg
              md:prose-base
              lg:prose-lg">
              <MDXContent />
            </div>

            {/* 目录导航 */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 w-full">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>

          {/* 文章页脚 */}
          <footer className="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            {/* 文章标签 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map(tag => (
                  <Link
                    key={tag}
                    href={createTagRoute(tag)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 
                      bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md
                      hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* 上下篇导航 */}
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost && (
                <Link
                  href={prevPost.url as PostRoute}
                  className="group p-4 border border-gray-200 dark:border-gray-800 rounded-lg
                    hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">上一篇</span>
                  <h3 className="mt-2 text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {prevPost.title}
                  </h3>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={nextPost.url as PostRoute}
                  className="group p-4 border border-gray-200 dark:border-gray-800 rounded-lg
                    hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
                    md:text-right"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">下一篇</span>
                  <h3 className="mt-2 text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {nextPost.title}
                  </h3>
                </Link>
              )}
            </nav>
          </footer>
        </div>
      </div>
    </article>
  )
} 