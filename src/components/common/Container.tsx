import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
}

const sizeMap = {
  sm: 'max-w-2xl',    // 672px - 适合简洁的文本内容
  md: 'max-w-3xl',    // 768px - 适合文章阅读（最佳阅读宽度）
  lg: 'max-w-4xl',    // 896px - 适合关于页、表单页等
  xl: 'max-w-5xl',    // 1024px - 适合列表页、分类页
  default: 'max-w-5xl' // 1024px - 默认使用 xl，适合大多数页面
}

export function Container({
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
