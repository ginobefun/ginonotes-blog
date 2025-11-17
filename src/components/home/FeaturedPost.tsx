'use client'

import { Post } from 'contentlayer2/generated'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import Image from 'next/image'

interface FeaturedPostProps {
    post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    const categoryName = getCategoryName(post.category as keyof typeof CATEGORY_MAP)

    return (
        <motion.article
            whileHover={{ scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-emerald-50 shadow-lg transition-all hover:shadow-xl dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-emerald-950/50"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-8 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-8 right-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            <div className="relative grid gap-8 p-8 lg:grid-cols-[1fr_420px] lg:gap-12 lg:p-12">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm">
                        <Link
                            href={`/categories/${post.category}` as `/categories/${string}`}
                            className="text-primary hover:text-primary/80"
                        >
                            {categoryName}
                        </Link>
                        <span className="text-muted-foreground">·</span>
                        <time className="text-muted-foreground">{formatDate(post.date)}</time>
                    </div>

                    <Link href={post.url as `/posts/${string}/${string}`} className="group/title mt-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 transition-colors group-hover/title:text-primary dark:text-gray-50 lg:text-4xl">
                            {post.title}
                        </h2>
                    </Link>

                    <div className="mt-6">
                        <p className="text-lg text-gray-600 dark:text-gray-300 lg:text-xl">
                            {post.description}
                        </p>
                    </div>

                    <Link
                        href={post.url as `/posts/${string}/${string}`}
                        className="mt-8 inline-flex w-fit items-center rounded-lg bg-primary/10 px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                        阅读更多
                        <svg
                            className="ml-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>

                <Link href={post.url as `/posts/${string}/${string}`} className="relative aspect-[16/9] overflow-hidden rounded-2xl lg:aspect-[4/3]">
                    <Image
                        src={post.cover || `/images/categories/${post.category}.jpg`}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        priority
                    />
                </Link>
            </div>
        </motion.article>
    )
} 