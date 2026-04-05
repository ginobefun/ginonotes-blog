import { Route } from 'next'

// 定义所有可能的路由路径类型
export type PostRoute = Route<`/posts/${string}`>
export type CategoryRoute = Route<`/categories/${string}`>
export type TagRoute = Route<`/tags/${string}`>
export type TagsIndexRoute = Route<'/tags'>

// 定义外部链接类型
export type ExternalRoute = `https://${string}`

// 定义所有可能的路由类型
export type AppRoute =
  | Route<'/'>
  | Route<'/about'>
  | Route<'/tags'>
  | PostRoute
  | CategoryRoute
  | TagRoute
  | ExternalRoute

// 类型守卫函数
export const isExternalRoute = (route: string): route is ExternalRoute => {
  return route.startsWith('https://')
}

// 路由生成函数
export const createPostRoute = (slug: string): PostRoute => `/posts/${slug}` as PostRoute
export const createCategoryRoute = (category: string): CategoryRoute => `/categories/${category}` as CategoryRoute
export const createTagRoute = (tag: string): TagRoute => `/tags/${tag}` as TagRoute 