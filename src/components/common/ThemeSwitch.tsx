'use client'

import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-1",
        className
      )}
      aria-label={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
    >
      <FaSun className="hidden dark:block w-4 h-4" aria-hidden="true" />
      <FaMoon className="block dark:hidden w-4 h-4" aria-hidden="true" />
    </button>
  )
}

export default ThemeSwitch
