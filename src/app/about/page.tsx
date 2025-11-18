import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { FaBasketballBall, FaBook, FaRobot, FaJava, FaGithub, FaTwitter, FaWeixin } from 'react-icons/fa'
import { SiSpring, SiNextdotjs, SiMongodb } from 'react-icons/si'
import { GiPokerHand } from 'react-icons/gi'
import { HiMail } from 'react-icons/hi'
import { BsRobot, BsGear } from 'react-icons/bs'
import { Container } from '@/components/common/Container'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'

const meta = {
    title: '关于我 - Just be funny',
    description: '开发工程师，AI 爱好者，篮球迷，终身学习者。每周发送 AI 精选文章，欢迎订阅！',
    url: `${WEBSITE_HOST_URL}/about`,
}

export const metadata: Metadata = {
    metadataBase: new URL(WEBSITE_HOST_URL),
    title: meta.title,
    description: meta.description,
    openGraph: {
        title: meta.title,
        description: meta.description,
        url: meta.url,
        type: 'website',
    },
    twitter: {
        title: meta.title,
        description: meta.description,
        card: 'summary_large_image',
    },
    alternates: {
        canonical: meta.url,
    },
}

const skills = [
    { icon: FaJava, name: 'Java', color: 'text-red-500' },
    { icon: SiSpring, name: 'Spring', color: 'text-green-500' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-600' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-800 dark:text-gray-200' },
    { icon: BsRobot, name: 'RAG', color: 'text-purple-500' },
    { icon: BsGear, name: 'Workflow', color: 'text-blue-500' },
    { icon: FaRobot, name: 'Agent', color: 'text-emerald-500' },
]

const interests = [
    {
        icon: FaBasketballBall,
        title: '篮球',
        description: '热爱篮球运动，享受团队协作的乐趣'
    },
    {
        icon: GiPokerHand,
        title: '德州扑克',
        description: '享受策略思考和决策的乐趣'
    },
    {
        icon: FaBook,
        title: '阅读',
        description: '保持学习的习惯，探索不同领域的知识'
    },
    {
        icon: FaRobot,
        title: 'AI 产品',
        description: '关注并评测最新的 AI 产品和技术'
    },
]

const contacts = [
    {
        icon: FaWeixin,
        name: '微信',
        value: 'xingxing174556571',
        color: 'text-green-500',
    },
    {
        icon: FaGithub,
        name: 'GitHub',
        value: 'ginobefun',
        link: 'https://github.com/ginobefun',
        color: 'text-gray-800 dark:text-gray-200',
    },
    {
        icon: FaTwitter,
        name: 'Twitter',
        value: '@hongming731',
        link: 'https://twitter.com/hongming731',
        color: 'text-blue-400',
    },
    {
        icon: HiMail,
        name: '邮件',
        value: 'hi@gino.bot',
        link: 'mailto:hi@gino.bot',
        color: 'text-red-500',
    },
]

export default function About() {
    return (
        <Container size="2xl">
            <div className="py-6 sm:py-10 lg:py-12">
                <Breadcrumb />
                {/* 头部介绍 */}
                <div>
                    <h1 className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                        Just be funny~
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        👋 你好！我是 Gino，2011 年研究生毕业后，在通信、电商、证券等头部企业工作了将近 15 年。
                        主要负责后端开发、架构设计和稳定性保障等工作，经历过高并发、大流量系统的各种挑战。
                    </p>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        最近这两年，我把更多精力投入到 AI 领域，特别是 AI Agent 的开发实践、AI Coding 工具的探索，以及各类 AI 产品的体验和评测。
                        同时也在学习产品思维和运营能力，希望能将技术和产品更好地结合起来。虽然主攻后端，但也具备一定的全栈能力，
                        业余时间喜欢折腾一些有趣的事情。
                    </p>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        目前在运营
                        <a href="https://bestblogs.dev" target="_blank" rel="noopener noreferrer" className="px-1 text-blue-500 hover:text-blue-600">
                            bestblogs.dev
                        </a>
                        ，每周精选高质量的 AI 文章，已有超过 4000 位订阅者。通过 BestBlogs，我希望帮助更多人跟上 AI 的发展节奏，
                        同时也在思考如何将 AI Agent 能力融入产品中，让信息筛选和推荐变得更智能。
                    </p>
                </div>

                {/* 技术栈 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">技术栈</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        近 15 年的工作经历让我积累了丰富的后端开发经验，专注于构建高性能、高并发、高稳定性的系统。
                        同时也具备全栈开发能力，最近重点关注 AI Agent、RAG 和 Workflow 等 AI 应用的开发。
                    </p>
                    <div className="mt-8 flex flex-wrap gap-6">
                        {skills.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-2">
                                <skill.icon className={`h-6 w-6 ${skill.color}`} />
                                <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 兴趣爱好 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">兴趣爱好</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {interests.map((interest) => (
                            <div
                                key={interest.title}
                                className="group rounded-2xl bg-white/50 p-6 shadow-md transition-all hover:shadow-xl dark:bg-gray-800/50"
                            >
                                <interest.icon className="h-8 w-8 text-blue-500" />
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {interest.title}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {interest.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 博客目的 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">关于这个博客</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        这里是我的数字花园，主要记录在 AI 领域的学习和实践。你会看到关于 AI Agent 设计模式、认知架构、工具使用的深度文章，
                        也会看到我对各种 AI Coding 工具（如 Cursor、Claude Code、Codex）的使用体验，以及对最新 AI 产品和模型的评测。
                    </p>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        除了技术内容，你也能找到我的阅读笔记和一些思考随笔。我相信写作是最好的学习方式，通过输出来倒逼输入，
                        通过分享来深化理解。希望这些内容对你有所帮助，也欢迎通过下面的方式与我交流。
                    </p>
                </div>

                {/* 联系方式 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">联系方式</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {contacts.map((contact) => (
                            <div key={contact.name} className="flex items-center gap-4">
                                <contact.icon className={`h-6 w-6 ${contact.color}`} />
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{contact.name}</span>
                                    {contact.link ? (
                                        <a
                                            href={contact.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                        >
                                            {contact.value}
                                        </a>
                                    ) : (
                                        <span className="text-gray-900 dark:text-gray-100">{contact.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 订阅提示 */}
                <div className="mt-16">
                    <div className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/20">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            📬 订阅 BestBlogs AI 周刊
                        </h3>
                        <p className="mt-2 text-blue-800 dark:text-blue-200">
                            每周精选高质量的 AI 文章，覆盖 AI Agent、大模型、AI 应用等领域。已有超过 4000 位读者订阅。
                        </p>
                        <p className="mt-2 text-blue-800 dark:text-blue-200">
                            接下来我计划为 BestBlogs 引入 AI Agent 能力，让它能更智能地理解你的阅读偏好，提供个性化的文章推荐。
                            如果你对这个方向感兴趣，欢迎订阅并与我交流想法！
                        </p>
                        <a
                            href="https://www.bestblogs.dev/#subscribe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            立即订阅
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    )
}
