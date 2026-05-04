'use client'

import { motion, useReducedMotion } from 'framer-motion'

const primarySkills = ['AI Agent', 'LLM', 'Java', 'SpringBoot', 'C++']

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
                className="relative mx-auto max-w-6xl px-4 text-center"
            >
                <h1
                    className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl"
                    style={{ textWrap: 'balance' }}
                >
                    未来已至，创造不朽
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    
                </p>

                {/* 核心技能标签 — 减小间距避免 Workflow 孤行 */}
                <div className="mt-8 flex flex-wrap gap-1.5 justify-center max-w-lg">
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
            </motion.div>
        </section>
    )
}
