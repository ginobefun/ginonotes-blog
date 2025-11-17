"use client"

import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from 'contentlayer2/generated'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { PostRoute } from '@/lib/routes'

interface CategoryLayoutProps {
  posts: Post[]
  category: string
}

export function CategoryLayout({ posts, category }: CategoryLayoutProps) {
  return (
    <div className="min-h-screen w-full">
      {/* 分类头部 */}
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {getCategoryName(category as keyof typeof CATEGORY_MAP)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </header>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map(post => (
          <article 
            key={post.url} 
            className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* 封面图 */}
            {post.cover && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* 文章内容 */}
            <div className="flex-1 p-4 sm:p-6">
              <header>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <time dateTime={post.date} className="tabular-nums">
                    {format(parseISO(post.date), 'yyyy年MM月dd日')}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-blue-400/60" />
                    {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                  {post.title}
                </h2>
              </header>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {post.description}
              </p>
              <div className="mt-auto">
                {/* 文章链接 */}
                <Link 
                  href={post.url as PostRoute}
                  className="absolute inset-0"
                  aria-label={`阅读文章：${post.title}`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
} 