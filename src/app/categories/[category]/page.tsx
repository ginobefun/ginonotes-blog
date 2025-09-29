import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { CATEGORY_MAP } from '@/lib/images'
import { notFound } from 'next/navigation'
import { CategoryPageContent } from '@/components/category/CategoryPageContent'
import { Container } from '@/components/common/Container'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'

const POSTS_PER_PAGE = 10

interface CategoryPageProps {
    params: {
        category: string
    }
    searchParams: {
        page?: string
    }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
    // 验证分类是否有效
    if (!Object.keys(CATEGORY_MAP).includes(params.category)) {
        notFound()
    }

    // 获取当前分类的所有文章
    const categoryPosts = allPosts
        .filter((post) => post.category === params.category)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    // 分页逻辑
    const currentPage = Number(searchParams.page) || 1
    const totalPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE)
    const paginatedPosts = categoryPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    )

    return (
        <Container size="lg">
            <div className="py-6 sm:py-12 lg:py-16">
                <Breadcrumb />
                <CategoryPageContent
                    category={params.category}
                    posts={paginatedPosts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </Container>
    )
}

// 生成静态路由
export function generateStaticParams() {
    const categories = Object.keys(CATEGORY_MAP)
    return categories.map((category) => ({
        category,
    }))
} 