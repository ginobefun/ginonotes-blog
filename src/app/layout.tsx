import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/app/providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Navigation } from '@/components/navigation/Navigation'
import { jsonLd } from '@/lib/metadata'
import './global.css'
import {
    WEBSITE_HOST_URL,
    WEBSITE_NAME,
    WEBSITE_DESCRIPTION,
    WEBSITE_AUTHOR,
    WEBSITE_TWITTER,
    WEBSITE_LANGUAGE,
    WEBSITE_OG_IMAGE
} from '@/lib/constants'

// 视口配置
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

// Metadata 配置
export const metadata: Metadata = {
    metadataBase: new URL(WEBSITE_HOST_URL),
    title: {
        default: WEBSITE_NAME,
        template: `%s - ${WEBSITE_NAME}`,
    },
    description: WEBSITE_DESCRIPTION,
    applicationName: WEBSITE_NAME,
    authors: [{ name: WEBSITE_AUTHOR, url: WEBSITE_HOST_URL }],
    generator: 'Next.js',
    keywords: ['博客', '技术', '人工智能', '产品设计', '编程', 'Java', 'Workflow', 'Agent'],
    referrer: 'origin-when-cross-origin',
    creator: WEBSITE_AUTHOR,
    publisher: WEBSITE_AUTHOR,
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    openGraph: {
        title: {
            default: WEBSITE_NAME,
            template: `%s - ${WEBSITE_NAME}`,
        },
        description: WEBSITE_DESCRIPTION,
        siteName: WEBSITE_NAME,
        locale: WEBSITE_LANGUAGE,
        type: 'website',
        url: WEBSITE_HOST_URL,
        images: [{
            url: `${WEBSITE_HOST_URL}/images/og.png`,
            width: 1200,
            height: 630,
            alt: WEBSITE_NAME,
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: WEBSITE_NAME,
            template: `%s - ${WEBSITE_NAME}`,
        },
        description: WEBSITE_DESCRIPTION,
        site: WEBSITE_TWITTER,
        creator: WEBSITE_TWITTER,
        images: [`${WEBSITE_HOST_URL}/images/og.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: WEBSITE_HOST_URL,
        types: {
            'application/rss+xml': `${WEBSITE_HOST_URL}/feed.xml`,
        },
    },
    icons: {
        icon: [
            { url: `${WEBSITE_HOST_URL}/icon`, type: 'image/png', sizes: '32x32' }
        ],
        apple: `${WEBSITE_HOST_URL}/apple-icon`,
    },
    manifest: '/manifest.webmanifest',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang={WEBSITE_LANGUAGE} suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#ffffff" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={`RSS 2.0 - ${WEBSITE_NAME}`}
                    href={`${WEBSITE_HOST_URL}/feed.xml`}
                />
            </head>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="relative min-h-screen">
                        <Navigation />
                        <div className="transition-all lg:ml-64">
                            <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                                <ErrorBoundary>
                                    {children}
                                </ErrorBoundary>
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
