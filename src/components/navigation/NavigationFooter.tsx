import { FaSearch } from 'react-icons/fa'
import { ThemeSwitch } from '../common/ThemeSwitch'

interface NavigationFooterProps {
  onSearchClick: () => void
}

export function NavigationFooter({ onSearchClick }: NavigationFooterProps) {
  return (
    <div className="mt-auto pt-8 px-3 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <ThemeSwitch className="hidden lg:block" />
        <button
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50"
          onClick={onSearchClick}
          aria-label="搜索 (⌘K)"
        >
          <FaSearch className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs">⌘K</span>
        </button>
      </div>
    </div>
  )
} 