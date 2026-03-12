"use client"

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FaTimes } from 'react-icons/fa'
import { navigation } from '@/config/navigation'
import { NavigationItem } from './NavigationItem'
import { NavigationSection } from './NavigationSection'
import { NavigationProfile } from './NavigationProfile'
import { NavigationHeader } from './NavigationHeader'
import { NavigationFooter } from './NavigationFooter'
import { SearchDialog } from './SearchDialog'

export function Navigation() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 监听移动端返回按钮
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // 监听路由变化，关闭移动端菜单和搜索
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const handleOpenSearch = useCallback(() => {
    setIsSearchOpen(true)
    setIsMobileMenuOpen(false) // 打开搜索时关闭移动端菜单
  }, [])

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  return (
    <>
      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={handleCloseSearch}
        onOpen={handleOpenSearch}
      />
      <NavigationHeader 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onSearchClick={handleOpenSearch}
      />
      
      {/* 移动端菜单遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 导航菜单 */}
      <nav className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-8 px-4 ios-scroll transition-all duration-300 z-50",
        "lg:w-64 lg:translate-x-0",
        isMobileMenuOpen ? "w-[280px] translate-x-0" : "w-[280px] -translate-x-full",
      )}>
        <div className="flex flex-col h-full">
          {/* 移动端关闭按钮 */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* 个人信息 */}
          <NavigationProfile />

          {/* 导航分组 */}
          <div className="flex-1 px-3 py-3 space-y-1">
            <ul className="space-y-1">
              {navigation.main.map((item) => (
                <li key={item.href} className="flex items-stretch space-x-1">
                  <NavigationItem item={item} />
                </li>
              ))}
            </ul>

            <NavigationSection section={{ title: "文章分类", items: navigation.posts }} />
            <NavigationSection section={{ title: "项目作品", items: navigation.projects }} />
            <NavigationSection section={{ title: "在线链接", items: navigation.online }} />
          </div>

          {/* 底部工具栏 */}
          <NavigationFooter onSearchClick={handleOpenSearch} />
        </div>
      </nav>

      {/* 移动端内容区域 padding */}
      <div className="lg:hidden h-16" />
    </>
  )
} 