'use client'

import { Post } from 'contentlayer2/generated'
import { PostCard } from '@/components/common/PostCard'
import { motion } from 'framer-motion'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

interface CategoryPageContentProps {
  category: string
  posts: Post[]
  currentPage: number
  totalPages: number
}

export function CategoryPageContent({ 
  category, 
  posts, 
  currentPage, 
  totalPages 
}: CategoryPageContentProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={fadeInUp} className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {getCategoryName(category as keyof typeof CATEGORY_MAP)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </motion.div>

      {/* 文章列表 */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            variants={fadeInUp}
          >
            <PostCard {...post} priority={index < 2} />
          </motion.div>
        ))}
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex justify-center gap-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`/categories/${category}?page=${page}`}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
} 