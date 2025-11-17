import { allPosts } from 'contentlayer2/generated'
import { getFeaturedPost, getRecentPosts } from '@/lib/posts'
import { FeaturedSection } from './FeaturedSection'
import { PostList } from './PostList'

// 添加人工延迟以模拟网络延迟（仅用于开发环境）
const delay = (ms: number) => process.env.NODE_ENV === 'development' ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve()

export async function FeaturedPostSection() {
    const featuredPost = getFeaturedPost(allPosts)
    // 添加 100ms 延迟以确保骨架屏动画效果可见
    await delay(100)
    
    if (!featuredPost) return null
    return <FeaturedSection post={featuredPost} />
}

export async function RecentPostsSection() {
    const recentPosts = getRecentPosts(allPosts)
    // 添加 200ms 延迟以确保骨架屏动画效果可见
    await delay(200)
    
    return <PostList posts={recentPosts} />
} 