interface PostContentProps {
    children: React.ReactNode
}

export const PostContent = ({ children }: PostContentProps) => {
    return (
        <div className="article-content prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
            prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-base lg:prose-p:text-lg prose-p:leading-7 lg:prose-p:leading-8 prose-p:text-gray-600 dark:prose-p:text-gray-400
            prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-blue-600
            prose-strong:text-gray-900 dark:prose-strong:text-gray-100
            prose-code:text-blue-500 dark:prose-code:text-blue-400 prose-code:text-sm lg:prose-code:text-base
            prose-img:rounded-lg prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-800 prose-blockquote:pl-4 prose-blockquote:italic">
            {children}
        </div>
    )
} 