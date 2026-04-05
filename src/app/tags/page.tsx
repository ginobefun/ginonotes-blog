import { allPosts } from 'contentlayer2/generated'
import { Container } from '@/components/common/Container'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { WEBSITE_HOST_URL, WEBSITE_NAME } from '@/lib/constants'
import { FaTags } from 'react-icons/fa'
import Link from 'next/link'

// 获取所有标签及其数量
const getAllTags = () => {
  const allTags = allPosts.flatMap((post) => post.tags.split(',').map(t => t.trim()).filter(Boolean))
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags
    .map((tag) => ({
      tag,
      count: allPosts.filter((post) => post.tags.split(',').map(t => t.trim()).includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)
}

export default async function TagsPage() {
  const tags = getAllTags()

  // BreadcrumbList 结构化数据
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: WEBSITE_NAME,
        item: WEBSITE_HOST_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '标签分类',
        item: `${WEBSITE_HOST_URL}/tags`,
      },
    ],
  }

  return (
    <Container size="2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="py-6 sm:py-10 lg:py-12">
        <Breadcrumb />
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <FaTags className="w-8 h-8" />
              标签分类
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              共 {tags.length} 个标签
            </p>
          </div>

          {/* 标签网格 */}
          <div className="flex flex-wrap gap-3">
            {tags.map((item) => (
              <Link
                key={item.tag}
                href={`/tags/${encodeURIComponent(item.tag)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{item.tag}</span>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
                  {item.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
