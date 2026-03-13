import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NavigationItem as NavItemType } from '@/types/navigation'
import { isExternalRoute } from '@/lib/routes'

interface NavigationItemProps {
  item: NavItemType
}

export function NavigationItem({ item }: NavigationItemProps) {
  const pathname = usePathname()
  const { href, label, icon: Icon, count } = item
  const isActive = pathname === href
  const isExternal = isExternalRoute(href)

  const className = cn(
    'flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-1',
    isActive
      ? 'bg-ink/10 text-ink dark:bg-white/10 dark:text-gray-100'
      : 'text-gray-600 dark:text-gray-400 sm:hover:bg-gray-100 sm:hover:text-gray-900 sm:dark:hover:bg-gray-800 sm:dark:hover:text-gray-100'
  )

  const content = (
    <>
      <span className="flex items-center justify-center w-4">
        <Icon className="w-4 h-4" />
      </span>
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
          {count}
        </span>
      )}
      {isExternal && (
        <span className="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white">
          <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"/>
          </svg>
        </span>
      )}
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
} 