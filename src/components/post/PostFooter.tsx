import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface Post {
    _id: string
    title: string
    url: string
    date: string
}

interface PostFooterProps {
    tags?: string
    recommendedPosts: Post[]
    category?: string
    categoryPostsCount: number
}

export const PostFooter = ({
    tags,
    recommendedPosts,
    category,
    categoryPostsCount
}: PostFooterProps) => {
    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            {/* 标签区域 */}
            {tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.split(',').map((tag) => (
                        <span
                            key={tag.trim()}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            )}

            {/* 推荐文章区域 */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">相关文章</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {recommendedPosts.map(post => (
                        <Link
                            key={post._id}
                            href={post.url as `/posts/${string}/${string}`}
                            className="group block overflow-hidden rounded-lg border p-4 transition-colors hover:border-ink dark:border-gray-800"
                        >
                            <span className="block line-clamp-2 font-medium text-gray-900 group-hover:text-ink dark:text-gray-100">
                                {post.title}
                            </span>
                            <time className="mt-2 block text-sm text-gray-500 dark:text-gray-400">
                                {format(parseISO(post.date), 'yyyy年MM月dd日')}
                            </time>
                        </Link>
                    ))}
                </div>
                {category && categoryPostsCount > 4 && (
                    <div className="text-center">
                        <Link
                            href={`/categories/${category}`}
                            className="inline-flex items-center text-sm text-ink hover:text-ink-light"
                        >
                            查看更多 {getCategoryName(category as keyof typeof CATEGORY_MAP)} 的文章
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
} 