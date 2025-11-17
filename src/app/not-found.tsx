'use client'

import Link from 'next/link'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 py-20 animate-fadeIn">
        {/* 404 图标 */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* 错误信息 */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            页面未找到
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            抱歉，您访问的页面不存在或已被移动。请检查 URL 是否正确，或返回首页继续浏览。
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              返回首页
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
              <ArrowLeft className="h-5 w-5" />
              返回上一页
            </Link>
          </Button>
        </div>

        {/* 推荐链接 */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            您可能想访问：
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/categories/ai"
              className="text-sm px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
            >
              AI 分类
            </Link>
            <Link
              href="/categories/dev"
              className="text-sm px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors"
            >
              开发分类
            </Link>
            <Link
              href="/categories/build"
              className="text-sm px-4 py-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 transition-colors"
            >
              构建分类
            </Link>
            <Link
              href="/about"
              className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            >
              关于我
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
} 