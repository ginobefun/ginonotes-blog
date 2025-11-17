import { Metadata } from 'next'
import { allPosts } from 'contentlayer2/generated'
import {
    WEBSITE_HOST_URL,
    WEBSITE_AUTHOR,
    WEBSITE_LANGUAGE,
    WEBSITE_TWITTER
} from '@/lib/constants'

interface PostLayoutProps {
    children: React.ReactNode
    params: Promise<{
        slug: string[]
    }>
}

function getOgImage(post: { cover?: string }) {
    if (!post.cover) {
        throw new Error('Post must have a cover image')
    }

    // 如果封面图是完整的 URL，直接返回
    if (post.cover.startsWith('http')) {
        return post.cover
    }
    // 否则拼接完整的 URL
    return `${WEBSITE_HOST_URL}${post.cover}`
}

function generatePostJsonLd(post: any) {
    const keywords = post.tags?.split(',').map((tag: string) => tag.trim()) || []
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Person',
            name: WEBSITE_AUTHOR,
            url: WEBSITE_HOST_URL,
        },
        datePublished: post.date,
        dateModified: post.date,
        image: getOgImage(post),
        url: `${WEBSITE_HOST_URL}${post.url}`,
        publisher: {
            '@type': 'Person',
            name: WEBSITE_AUTHOR,
            url: WEBSITE_HOST_URL,
        },
        inLanguage: WEBSITE_LANGUAGE,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${WEBSITE_HOST_URL}${post.url}`,
        },
        keywords: keywords,
    }
}

export async function generateMetadata({ params }: PostLayoutProps): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((post) => {
        const urlPath = post.url.replace('/posts/', '')
        return urlPath === slug.join('/')
    })

    if (!post) return {}

    const ogImage = getOgImage(post)
    const postUrl = `${WEBSITE_HOST_URL}${post.url}`
    const keywords = post.tags?.split(',').map(tag => tag.trim()) || []

    return {
        title: post.title,
        description: post.description,
        keywords: keywords,
        authors: [{ name: WEBSITE_AUTHOR }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [WEBSITE_AUTHOR],
            url: postUrl,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: WEBSITE_TWITTER,
            creator: WEBSITE_TWITTER,
            title: post.title,
            description: post.description,
            images: [ogImage],
        },
        alternates: {
            canonical: postUrl,
        },
    }
}

export default async function PostLayout({ children, params }: PostLayoutProps) {
    // 获取文章数据用于生成结构化数据
    const { slug } = await params
    const post = allPosts.find((post) => {
        const urlPath = post.url.replace('/posts/', '')
        return urlPath === slug.join('/')
    })

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {post && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generatePostJsonLd(post)),
                    }}
                />
            )}
            <main className="relative py-16 sm:py-24">
                {children}
            </main>
        </div>
    )
} 