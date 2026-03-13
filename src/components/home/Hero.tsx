'use client'

import { motion, useReducedMotion } from 'framer-motion'

const primarySkills = ['AI Agent', 'LLM', 'AI Coding', 'RAG', 'Workflow']
const secondarySkills = ['Java', 'Spring', 'Next.js', 'MongoDB', 'Tailwind CSS']

export function Hero() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <section className="relative pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
            {/* 科技感网格背景 — 深色模式降低可见度 */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_20%_0%,#000_70%,transparent_100%)] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_20%_0%,#000_30%,transparent_80%)]" />

            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
                className="relative mx-auto max-w-6xl px-4"
            >
                <h1
                    className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl"
                    style={{ textWrap: 'balance' }}
                >
                    从工程实践到 AI 探索
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    15 年工程经验 · AI Agent 深度实践 · BestBlogs 万人订阅
                </p>

                {/* 核心技能标签 — 减小间距避免 Workflow 孤行 */}
                <div className="mt-8 flex flex-wrap gap-1.5">
                    {primarySkills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.15 + i * 0.05, duration: 0.3 }}
                            className="inline-flex items-center rounded-full bg-ink/10 px-2 py-0.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink/20 sm:px-2.5 sm:text-sm dark:bg-ink/20 dark:text-ink dark:ring-ink/30"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* 次要技能标签 */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {secondarySkills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
