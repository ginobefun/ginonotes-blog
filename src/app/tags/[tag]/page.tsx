import { allPosts } from 'contentlayer2/generated'
import { compareDesc } from 'date-fns'
import { notFound } from 'next/navigation'
import { TagPageContent } from '@/components/tags/TagPageContent'
import { Container } from '@/components/common/Container'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { WEBSITE_HOST_URL, WEBSITE_NAME } from '@/lib/constants'

const POSTS_PER_PAGE = 10

interface TagPageProps {
    params: Promise<{
        tag: string
    }>
    searchParams: Promise<{
        page?: string
    }>
}

// 解码 URL 中的标签
const decodeTag = (tag: string): string => {
    return decodeURIComponent(tag)
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
    const { tag } = await params
    const { page } = await searchParams

    const decodedTag = decodeTag(tag)

    // 获取包含该标签的所有文章
    const tagPosts = allPosts
        .filter((post) => post.tags.split(',').map(t => t.trim()).includes(decodedTag))
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    // 如果没有文章，返回 404
    if (tagPosts.length === 0) {
        notFound()
    }

    // 分页逻辑
    const currentPage = Number(page) || 1
    const totalPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE)
    const paginatedPosts = tagPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    )

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
                name: `标签: ${decodedTag}`,
                item: `${WEBSITE_HOST_URL}/tags/${tag}`,
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
                <TagPageContent
                    tag={decodedTag}
                    posts={paginatedPosts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </Container>
    )
}

// 生成静态路由参数
export function generateStaticParams() {
    // 获取所有标签
    const allTags = allPosts.flatMap((post) => post.tags.split(',').map(t => t.trim()).filter(Boolean))
    const uniqueTags = [...new Set(allTags)]

    return uniqueTags.map((tag) => ({
        tag: encodeURIComponent(tag),
    }))
}
