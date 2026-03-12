"use client"

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const content = document.querySelector('article')
      if (!content) return

      const contentBox = content.getBoundingClientRect()
      const totalHeight = contentBox.height
      const windowHeight = window.innerHeight
      const current = window.scrollY + windowHeight - contentBox.top

      // 计算阅读进度百分比
      const percent = Math.min(Math.max(current / totalHeight, 0), 1) * 100
      setProgress(percent)
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="阅读进度"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800 hidden md:block"
    >
      <div
        className="h-full bg-blue-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
} 