'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Giscus from '@giscus/react'

interface CommentsProps {
  className?: string
}

export function Comments({ className }: CommentsProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 确保组件已挂载，避免 hydration 错误
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  // 根据主题选择 Giscus 主题
  const giscusTheme = theme === 'dark' || resolvedTheme === 'dark'
    ? 'dark'
    : 'light'

  return (
    <div className={className}>
      <Giscus
        repo="ginobefun/ginonotes-blog"
        repoId="R_kgDOLerfFw"
        category="Comments"
        categoryId="DIC_kwDOLerfF84Cx56q"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  )
}
