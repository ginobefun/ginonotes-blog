'use client'

import { Post } from 'contentlayer2/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlurImage } from './BlurImage'
import { calculateReadingTime } from '@/lib/utils'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface PostCardProps extends Post {
    priority?: boolean
}

export function PostCard({ priority = false, ...post }: PostCardProps) {
    const readingTime = calculateReadingTime(post.body.raw)
    const tags = post.tags ? post.tags.split(',') : []

    return (
        <motion.article
            whileHover={{ scale: 1.02 }}
            className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white/50 shadow-md transition-all hover:shadow-xl dark:bg-gray-800/50"
        >
            {/* 渐变装饰 */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-2xl transition-all group-hover:rotate-45" />

            {/* 内容区域 */}
            <div className="relative flex h-full flex-col space-y-4 p-6">
                <div className="aspect-[2/1] overflow-hidden rounded-xl">
                    <Link
                        href={post.url as `/posts/${string}/${string}`}
                        className="block h-full w-full"
                    >
                        <BlurImage
                            src={post.cover}
                            alt={post.title}
                            width={600}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={priority}
                        />
                    </Link>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4">
                    <div className="space-y-3">
                        <Link
                            href={`/categories/${post.category}`}
                            className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ring-1 ring-blue-100/50 transition-colors hover:bg-blue-200 dark:bg-blue-900/70 dark:text-blue-200 dark:ring-blue-900/50 dark:hover:bg-blue-900"
                        >
                            {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                        </Link>
                        <Link
                            href={post.url as `/posts/${string}/${string}`}
                            className="block space-y-3 focus:outline-none"
                        >
                            <h2 className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400">
                                {post.title}
                            </h2>
                            <p className="line-clamp-4 text-base md:text-lg text-gray-600 dark:text-gray-400">
                                {post.description}
                            </p>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime={post.date} className="flex items-center">
                                <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {format(parseISO(post.date), 'yyyy年MM月dd日')}
                            </time>
                            <span className="flex items-center">
                                <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {readingTime} 分钟阅读
                            </span>
                        </div>

                        {/* 标签 - 最多显示3个 */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-gray-100/50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-800/50"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
