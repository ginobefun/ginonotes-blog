import { useState, useEffect, useMemo } from 'react'
import { allPosts } from 'contentlayer2/generated'
import Link from 'next/link'
import { PostRoute } from '@/lib/routes'
import { Search as SearchIcon } from 'lucide-react'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { format, parseISO } from 'date-fns'
import Fuse from 'fuse.js'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function SearchDialog({ isOpen, onClose, onOpen }: SearchDialogProps) {
  const [query, setQuery] = useState('')

  // 初始化 Fuse.js 搜索引擎
  const fuse = useMemo(() => {
    return new Fuse(allPosts, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.15 },
        { name: 'category', weight: 0.05 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    })
  }, [])

  // 重置搜索状态
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        isOpen ? onClose() : onOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onOpen])

  // 使用 Fuse.js 进行模糊搜索
  const results = useMemo(() => {
    if (!query || query.trim().length < 2) return []

    const searchResults = fuse.search(query)
    return searchResults.slice(0, 8).map(result => result.item)
  }, [query, fuse])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999]">
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 搜索框 */}
      <div className="relative mx-auto max-w-3xl px-4 pt-12 sm:pt-16">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
          {/* 搜索输入框 */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6">
            <SearchIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full bg-transparent py-4 text-lg sm:text-xl text-gray-900 placeholder-gray-400 focus:outline-none dark:text-gray-100"
              autoFocus
            />
            <kbd className="hidden sm:block rounded bg-gray-100 px-2 py-0.5 font-mono text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              ESC
            </kbd>
          </div>

          {/* 搜索结果 */}
          {results.length > 0 && (
            <div className="max-h-[60vh] ios-scroll divide-y divide-gray-100 dark:divide-gray-800">
              {results.map((post) => (
                <Link
                  key={post.url}
                  href={post.url as PostRoute}
                  onClick={onClose}
                  className="block px-4 sm:px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 ring-1 ring-blue-100/50 transition-colors hover:bg-blue-200 dark:bg-blue-900/70 dark:text-blue-200 dark:ring-blue-900/50 dark:hover:bg-blue-900">
                        {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date} className="flex items-center gap-1.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {format(parseISO(post.date), 'yyyy年MM月dd日')}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 空状态 */}
          {query && !results.length && (
            <div className="p-8 text-center text-base sm:text-lg text-gray-500 dark:text-gray-400">
              未找到相关文章
            </div>
          )}

          {/* 快捷键提示 */}
          {!query && (
            <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
              按 ESC 关闭 · 按 ⌘K 重新打开
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 