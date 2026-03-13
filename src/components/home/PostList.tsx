import { Post } from 'contentlayer2/generated'
import { PostCard } from '@/components/common/PostCard'

interface PostListProps {
    posts: Post[]
}

export function PostList({ posts }: PostListProps) {
    if (!posts.length) return null

    return (
        <section className="w-full">
            <div className="flex flex-col space-y-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-700 dark:text-gray-300">
                        最新文章
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
                    {posts.map((post, index) => (
                        <div key={post._id} className="group flex h-full">
                            <PostCard {...post} priority={index < 1} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 