'use client'

import { motion } from 'framer-motion'

const primarySkills = ['AI Agent', 'LLM', 'AI Coding', 'RAG', 'Workflow']
const secondarySkills = ['Java', 'Spring', 'Next.js', 'MongoDB', 'Tailwind CSS']

export function Hero() {
    return (
        <section className="relative overflow-hidden py-12 sm:py-16">
            {/* 科技感网格背景 */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* 装饰性元素 - 统一品牌色系 */}
            <div className="absolute -left-4 top-0 h-56 w-56 animate-blob rounded-full bg-indigo-300 opacity-30 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />
            <div className="animation-delay-2000 absolute -right-4 top-0 h-56 w-56 animate-blob rounded-full bg-cyan-300 opacity-30 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />
            <div className="animation-delay-4000 absolute -bottom-8 left-20 h-56 w-56 animate-blob rounded-full bg-blue-300 opacity-30 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />

            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0, y: -20 },
                    show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mx-auto max-w-6xl px-4 text-center"
            >
                <h1 className="mx-auto max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text pb-3 text-3xl font-bold text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 md:text-4xl lg:text-5xl">
                    从工程实践到 AI 探索
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                    15 年工程经验 · AI Agent 深度实践 · BestBlogs 万人订阅
                </p>

                {/* 核心技能标签 */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {primarySkills.map((skill) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-semibold text-indigo-800 ring-1 ring-indigo-200/50 dark:bg-indigo-900/70 dark:text-indigo-200 dark:ring-indigo-800/50"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* 次要技能标签 */}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {secondarySkills.map((skill) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
