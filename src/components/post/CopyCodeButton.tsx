"use client"

import { useEffect } from 'react'

export function CopyCodeButton() {
  useEffect(() => {
    const article = document.querySelector('.article-content')
    if (!article) return

    const preBlocks = article.querySelectorAll('pre')

    preBlocks.forEach((pre) => {
      // 跳过已经添加过按钮的
      if (pre.parentElement?.querySelector('.copy-code-button')) return

      // 确保 pre 的父元素是相对定位
      const wrapper = pre.parentElement
      if (wrapper) {
        wrapper.style.position = 'relative'
      }

      const button = document.createElement('button')
      button.className = 'copy-code-button'
      button.setAttribute('aria-label', '复制代码')
      button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        try {
          await navigator.clipboard.writeText(code)
          button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
          button.classList.add('copied')
          setTimeout(() => {
            button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
            button.classList.remove('copied')
          }, 2000)
        } catch {
          // 降级：使用 execCommand
          const textarea = document.createElement('textarea')
          textarea.value = code
          textarea.style.position = 'fixed'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }
      })

      // 插入到 pre 的父容器中（rehype-pretty-code 的 fragment wrapper）
      if (wrapper && wrapper !== article) {
        wrapper.appendChild(button)
      } else {
        pre.style.position = 'relative'
        pre.appendChild(button)
      }
    })
  }, [])

  return null
}
