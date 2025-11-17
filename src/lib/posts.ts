import { Post } from 'contentlayer2/generated'
import { compareDesc } from 'date-fns'

/**
 * 获取按日期排序的文章列表
 * 对于日期相同的文章，按标题排序
 */
export function getSortedPosts(posts: Post[]) {
  return posts.sort((a, b) => {
    // 首先按日期降序排序
    const dateComparison = compareDesc(new Date(a.date), new Date(b.date))
    
    // 如果日期相同，则按标题升序排序
    if (dateComparison === 0) {
      return a.title.localeCompare(b.title, 'zh-CN')
    }
    
    return dateComparison
  })
}

/**
 * 获取文章分类统计
 */
export function getCategoryStats(posts: Post[]) {
  return posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 获取最新的特色文章
 */
export function getFeaturedPost(posts: Post[]) {
  // 仅获取特色文章中最新的一篇
  const featuredPosts = getSortedPosts(posts.filter(post => post.featured))
  if (featuredPosts.length > 0) {
    return featuredPosts[0]
  }

  // 如果没有任何特色文章，则获取最新的文章
  return getSortedPosts(posts)[0]
}

/**
 * 获取最近的 N 篇文章（不包含最新的特色文章）
 */
export function getRecentPosts(posts: Post[], count: number = 10) {
  // 获取最新的特色文章
  const featuredPost = getFeaturedPost(posts)

  // 从最新的文章（排除特色文章）中选取 N 篇
  const recentPosts = getSortedPosts(posts.filter(post => post._id !== featuredPost._id))
  return recentPosts.slice(0, count)
}