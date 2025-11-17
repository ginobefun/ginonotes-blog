import { Post } from 'contentlayer2/generated'
import { Container } from '@/components/common/Container'
import { FeaturedPost } from '@/components/home/FeaturedPost'

interface FeaturedSectionProps {
    post: Post
}

export function FeaturedSection({ post }: FeaturedSectionProps) {
    if (!post) return null

    return (
        <section className="py-8">
            <Container>
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            精选文章
                        </h2>
                    </div>
                    <div className="px-4 -mx-4 sm:-mx-6 lg:-mx-8">
                        <FeaturedPost post={post} />
                    </div>
                </div>
            </Container>
        </section>
    )
} 