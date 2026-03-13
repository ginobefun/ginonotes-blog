import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface PostHeaderProps {
    title: string
    date: string
    readingTime: number
    category?: string
}

export const PostHeader = ({ title, date, readingTime, category }: PostHeaderProps) => {
    return (
        <div className="mb-8 md:mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100" style={{ textWrap: 'balance' }}>
                {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={date} className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {format(parseISO(date), 'yyyy年MM月dd日')}
                </time>
                <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {readingTime} 分钟阅读
                </span>
                {category && (
                    <Link
                        href={`/categories/${category}`}
                        className="inline-flex items-center rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-medium text-ink ring-1 ring-inset ring-ink/20 transition-colors hover:bg-ink/15 dark:bg-ink/20 dark:text-ink dark:ring-ink/30"
                    >
                        {getCategoryName(category as keyof typeof CATEGORY_MAP)}
                    </Link>
                )}
            </div>
        </div>
    )
} 