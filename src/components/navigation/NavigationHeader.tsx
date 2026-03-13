import { FaBars, FaSearch } from 'react-icons/fa'
import { ThemeSwitch } from '../common/ThemeSwitch'

interface NavigationHeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function NavigationHeader({ onMenuClick, onSearchClick }: NavigationHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30">
      <div className="flex items-center justify-between px-4 h-full">
        <button
          className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50"
          onClick={onMenuClick}
          aria-label="打开菜单"
        >
          <FaBars className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Gino Notes
        </span>
        <div className="flex items-center gap-2">
          <ThemeSwitch className="lg:hidden" />
          <button
            className="p-2 -mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50"
            onClick={onSearchClick}
            aria-label="搜索"
          >
            <FaSearch className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
