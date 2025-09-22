"use client"

import { useEffect, useState } from 'react'
import { slugify } from '@/lib/utils'

interface TableOfContentsProps {
    headings: { level: number; text: string }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')
    const [items, setItems] = useState(() => {
        const occurrences = new Map<string, number>()
        return headings.map((heading, index) => {
            const baseId = slugify(heading.text) || `heading-${index}`
            const count = occurrences.get(baseId) ?? 0
            occurrences.set(baseId, count + 1)
            const uniqueId = count ? `${baseId}-${count}` : baseId
            return { ...heading, id: uniqueId }
        })
    })

    useEffect(() => {
        const article = document.querySelector('.article-content')
        if (!article) return

        const headingElements = Array.from(
            article.querySelectorAll('h2, h3, h4')
        ) as HTMLElement[]

        const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase()
        const pool = headingElements.map((element) => ({
            element,
            text: normalize(element.textContent || ''),
            used: false,
        }))

        const occurrences = new Map<string, number>()

        const resolved = headings.map((heading, index) => {
            const normalized = normalize(heading.text)
            const match = pool.find((candidate) => !candidate.used && candidate.text === normalized)
            const element = match?.element ?? headingElements[index]

            if (match) {
                match.used = true
            }

            if (!element) {
                const baseId = slugify(heading.text) || `heading-${index}`
                const count = occurrences.get(baseId) ?? 0
                occurrences.set(baseId, count + 1)
                const fallbackId = count ? `${baseId}-${count}` : baseId
                return { ...heading, id: fallbackId }
            }

            if (!element.id) {
                const baseId = slugify(heading.text) || `heading-${index}`
                const count = occurrences.get(baseId) ?? 0
                occurrences.set(baseId, count + 1)
                const generatedId = count ? `${baseId}-${count}` : baseId
                element.id = generatedId
                return { ...heading, id: generatedId }
            }

            return { ...heading, id: element.id }
        })

        setItems(resolved)
    }, [headings])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-80px 0% -60% 0%' }
        )

        items.forEach(item => {
            if (!item.id) return
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => {
            items.forEach(item => {
                if (!item.id) return
                const element = document.getElementById(item.id)
                if (element) observer.unobserve(element)
            })
        }
    }, [items])

    if (items.length === 0) return null

    return (
        <nav className="w-full py-2">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">目录</h2>
                <ul className="space-y-3 text-base">
                    {items.map((heading) => {
                        const id = heading.id
                        return (
                            <li
                                key={id}
                                style={{ paddingLeft: `${(heading.level - 2) * 1.25}rem` }}
                            >
                                <a
                                    href={`#${id}`}
                                    className={`inline-block py-0.5 transition-colors hover:text-primary ${activeId === id
                                        ? 'text-primary font-medium'
                                        : 'text-muted-foreground'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const element = document.getElementById(id)
                                        if (element) {
                                            const headerOffset = 80
                                            const elementPosition = element.getBoundingClientRect().top + window.scrollY
                                            const offsetPosition = elementPosition - headerOffset

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth',
                                            })
                                            // 更新 URL
                                            window.history.pushState({}, '', `#${id}`)
                                        }
                                    }}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
} 
