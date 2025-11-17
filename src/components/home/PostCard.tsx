import Link from 'next/link'
import Image from 'next/image'
import { Post } from 'contentlayer2/generated'
import { formatDate } from '@/lib/utils'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const categoryName = getCategoryName(post.category as keyof typeof CATEGORY_MAP)

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white/50 shadow-md dark:bg-gray-800/50">
      <Link href={post.url as `/posts/${string}/${string}`} className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={post.cover || `/images/categories/${post.category}.jpg`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* 分类和日期 */}
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

        {/* 标题 */}
        <Link href={post.url as `/posts/${string}/${string}`} className="mt-4">
          <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
            {post.title}
          </h2>
        </Link>

        {/* 摘要 */}
        <div className="mt-4 flex-1">
          <p className="line-clamp-3 text-muted-foreground">
            {post.description}
          </p>
        </div>
      </div>
    </article>
  )
} 