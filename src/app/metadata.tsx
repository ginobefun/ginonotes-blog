import { Metadata } from 'next'
import { metadata as siteMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...siteMetadata,
  icons: {
    icon: '/icon',
    shortcut: '/icon',
  },
  manifest: '/manifest.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
} 