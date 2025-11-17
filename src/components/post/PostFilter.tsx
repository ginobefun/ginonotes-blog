"use client"

import { useState, useCallback } from 'react'
import { allPosts } from 'contentlayer2/generated'
import { Post } from 'contentlayer2/generated'

type FilterProps = {
  onFilter: (posts: Post[]) => void
}

export function PostFilter({ onFilter }: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')

  // 获取所有分类
  const categories = Array.from(new Set(allPosts.map((post) => post.category)))
  
  // 获取所有标签
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags.split(','))))

  const handleFilter = useCallback(() => {
    let filtered = allPosts

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    onFilter(filtered)
  }, [selectedCategory, selectedTag, onFilter])

  return (
    <div className="flex flex-wrap gap-4 py-4">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value)
          handleFilter()
        }}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
      >
        <option value="">所有分类</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedTag}
        onChange={(e) => {
          setSelectedTag(e.target.value)
          handleFilter()
        }}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
      >
        <option value="">所有标签</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  )
} 