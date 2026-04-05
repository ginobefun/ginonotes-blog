import { Metadata } from 'next'
import { WEBSITE_HOST_URL } from './constants'

const meta = {
  title: 'Haock Blog',
  description: '2年工程经验，记录学习和思考的内容',
  image: `${WEBSITE_HOST_URL}/logo.jpg`,
  author: 'Haock Liu',
}

// Schema.org 结构化数据
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: meta.title,
  description: meta.description,
  url: WEBSITE_HOST_URL,
  author: {
    '@type': 'Person',
    name: meta.author,
    url: WEBSITE_HOST_URL,
    sameAs: [
      'https://github.com/ginobefun',
      'https://x.com/haock0',
      'https://bestblogs.dev',
    ],
  },
  publisher: {
    '@type': 'Person',
    name: meta.author,
    url: WEBSITE_HOST_URL,
  },
  image: meta.image,
  inLanguage: 'zh-CN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${WEBSITE_HOST_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: meta.title,
    template: '%s | Haock Blog',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'zh-CN',
    type: 'website',
    images: [
      {
        url: meta.image,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.image,
        width: 1200,
        height: 630,
        alt: meta.title,
      }
    ],
    card: 'summary_large_image',
    creator: '@haock0',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
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
  }
} 