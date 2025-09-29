'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaChevronRight } from 'react-icons/fa'
import { getCategoryName } from '@/lib/images'
import { CATEGORY_MAP } from '@/lib/images'
import type { Route } from 'next'

interface BreadcrumbItem {
    label: string
    href?: any
    isCurrentPage?: boolean
    isEllipsis?: boolean
}

interface BreadcrumbProps {
    customItems?: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ customItems, className = '' }: BreadcrumbProps) {
    const pathname = usePathname()

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        // 如果传入了自定义面包屑，使用自定义的
        if (customItems) {
            return [{ label: '首页', href: '/' }, ...customItems]
        }

        const segments = pathname.split('/').filter(Boolean)
        const breadcrumbs: BreadcrumbItem[] = [{ label: '首页', href: '/' }]

        if (segments.length === 0) {
            return breadcrumbs
        }

        // 处理分类页面 /categories/[category]
        if (segments[0] === 'categories' && segments[1]) {
            const category = segments[1] as keyof typeof CATEGORY_MAP
            breadcrumbs.push({
                label: getCategoryName(category),
                isCurrentPage: true
            })
        }

        // 处理文章页面 /posts/[...slug]
        else if (segments[0] === 'posts') {
            breadcrumbs.push({
                label: '文章',
                href: '/'
            })
            // 如果是具体文章页面，标题将通过 customItems 传入
        }

        // 处理关于页面
        else if (segments[0] === 'about') {
            breadcrumbs.push({
                label: '关于我',
                isCurrentPage: true
            })
        }

        // 处理标签页面 /tags/[tag]
        else if (segments[0] === 'tags' && segments[1]) {
            breadcrumbs.push({
                label: '标签',
                href: '/'
            })
            breadcrumbs.push({
                label: decodeURIComponent(segments[1]),
                isCurrentPage: true
            })
        }

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    // 如果只有首页，不显示面包屑
    if (breadcrumbs.length <= 1) {
        return null
    }

    // 动态计算每个面包屑项的最大宽度
    const getMaxWidth = (index: number, isLast: boolean) => {
        const totalItems = breadcrumbs.length

        if (totalItems === 1) return 'max-w-full'
        if (totalItems === 2) {
            return index === 0 ? 'max-w-[200px]' : 'max-w-none'
        }

        // 多项时的分配策略
        if (index === 0) return 'max-w-[150px]' // 首页项
        if (isLast) return 'max-w-none' // 当前页不限制宽度
        return 'max-w-[200px]' // 中间项
    }

    return (
        <nav
            className={`flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6 ${className}`}
            aria-label="面包屑导航"
        >
            {/* 桌面端：完整面包屑 */}
            <ol className="hidden sm:flex items-center space-x-2 w-full min-w-0">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    const maxWidthClass = getMaxWidth(index, isLast)

                    return (
                        <li key={index} className="flex items-center min-w-0">
                            {index > 0 && (
                                <FaChevronRight className="w-3 h-3 mx-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            )}

                            {item.href && !item.isCurrentPage ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center min-w-0"
                                >
                                    {index === 0 && <FaHome className="w-4 h-4 mr-1 flex-shrink-0" />}
                                    <span className={`truncate ${maxWidthClass}`} title={item.label}>
                                        {item.label}
                                    </span>
                                </Link>
                            ) : (
                                <span
                                    className={`flex items-center min-w-0 ${item.isCurrentPage
                                        ? 'text-gray-900 dark:text-gray-100 font-medium'
                                        : ''
                                        }`}
                                    aria-current={item.isCurrentPage ? 'page' : undefined}
                                >
                                    {index === 0 && <FaHome className="w-4 h-4 mr-1 flex-shrink-0" />}
                                    <span className={`truncate ${maxWidthClass}`} title={item.label}>
                                        {item.label}
                                    </span>
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>

            {/* 移动端：左对齐优先显示 */}
            <ol className="flex sm:hidden items-center w-full min-w-0">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    const isFirst = index === 0

                    return (
                        <li key={index} className={`flex items-center min-w-0 ${isLast ? 'flex-1' : 'flex-shrink-0'}`}>
                            {index > 0 && (
                                <FaChevronRight className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            )}

                            {item.href && !item.isCurrentPage ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center min-w-0"
                                >
                                    {isFirst && <FaHome className="w-4 h-4 mr-1 flex-shrink-0" />}
                                    <span
                                        className={`${isFirst ? 'flex-shrink-0' : 'truncate'} ${isFirst ? 'max-w-[80px]' : ''}`}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            ) : (
                                <span
                                    className={`flex items-center min-w-0 ${item.isCurrentPage
                                        ? 'text-gray-900 dark:text-gray-100 font-medium'
                                        : ''
                                        }`}
                                    aria-current={item.isCurrentPage ? 'page' : undefined}
                                >
                                    {isFirst && <FaHome className="w-4 h-4 mr-1 flex-shrink-0" />}
                                    <span
                                        className={`${isFirst ? 'flex-shrink-0' : 'truncate'} ${isFirst ? 'max-w-[80px]' : ''}`}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </span>
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}