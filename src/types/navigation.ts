import { Route } from 'next'
import { IconType } from 'react-icons'
import { AppRoute, ExternalRoute } from '@/lib/routes'

export interface NavigationItem {
  href: AppRoute | ExternalRoute
  label: string
  icon: IconType
  count?: number
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export interface NavigationConfig {
  main: NavigationItem[]
  posts: NavigationItem[]
  projects: NavigationItem[]
  online: NavigationItem[]
  tags: NavigationItem[]
} 