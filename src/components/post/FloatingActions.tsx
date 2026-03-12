"use client"

import { useEffect, useState } from 'react'
import { TableOfContents } from './TableOfContents'

interface FloatingActionsProps {
  headings: { level: number; text: string }[]
}

export function FloatingActions({ headings }: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 关闭 TOC 时阻止背景滚动
  useEffect(() => {
    if (showToc) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showToc])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasToc = headings.length > 0

  return (
    <>
      {/* 浮动按钮组 - 仅在 lg 以下显示 */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 lg:hidden">
        {/* 目录按钮 */}
        {hasToc && (
          <button
            onClick={() => setShowToc(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl active:scale-95 dark:bg-gray-800 dark:ring-gray-700"
            aria-label="打开目录"
          >
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* 回到顶部按钮 */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl active:scale-95 dark:bg-gray-800 dark:ring-gray-700"
            aria-label="回到顶部"
          >
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>

      {/* 移动端 TOC 抽屉 */}
      {showToc && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowToc(false)}
          />

          {/* 底部抽屉 */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white px-6 pb-8 pt-4 shadow-2xl dark:bg-gray-900">
            {/* 拖动条 */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* 关闭按钮 */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">目录</span>
              <button
                onClick={() => setShowToc(false)}
                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="关闭目录"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 点击 TOC 链接后关闭抽屉 */}
            <div onClick={() => setShowToc(false)}>
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
