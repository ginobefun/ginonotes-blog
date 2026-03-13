import Image from 'next/image'
import { FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa'

const socialLinks = [
    { href: 'https://github.com/ginobefun', icon: FaGithub, label: 'GitHub' },
    { href: 'https://twitter.com/hongming731', icon: FaTwitter, label: 'Twitter' },
]

export function NavigationProfile() {
    return (
        <div className="px-2 mb-6 mt-2 lg:mt-0">
            <div className="relative group">
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-ink/20 dark:ring-ink/30">
                    <Image
                        src="/avatar.jpg"
                        alt="Gino"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 80px) 80px"
                        priority
                    />
                </div>
                <div className="text-center space-y-1.5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Gino
                    </h2>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        工程师 · AI 产品创造者
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                        Just be funny.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <a
                            href="mailto:hi@gino.bot"
                            className="text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-ink transition-colors"
                            aria-label="Email"
                        >
                            <FaEnvelope className="w-4 h-4" />
                        </a>
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-ink transition-colors"
                                aria-label={label}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
