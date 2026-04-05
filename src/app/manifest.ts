import { MetadataRoute } from 'next'
import { metadata } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.title?.toString(),
    short_name: 'Haock Blog',
    description: metadata.description?.toString(),
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png'
      }
    ]
  }
} 