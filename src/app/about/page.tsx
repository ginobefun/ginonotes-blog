import type { Metadata } from 'next'
import { Container } from '@/components/common/Container'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { aboutConfig } from '@/config/about'

export const metadata: Metadata = {
  metadataBase: new URL(aboutConfig.meta.url),
  title: aboutConfig.meta.title,
  description: aboutConfig.meta.description,
  openGraph: {
    title: aboutConfig.meta.title,
    description: aboutConfig.meta.description,
    url: aboutConfig.meta.url,
    type: 'website',
  },
  twitter: {
    title: aboutConfig.meta.title,
    description: aboutConfig.meta.description,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: aboutConfig.meta.url,
  },
}

export default function About() {
  return (
    <Container size="2xl">
      <div className="py-6 sm:py-10 lg:py-12">
        <Breadcrumb />

        {/* 头部介绍 */}
        <div>
          <h1 className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {aboutConfig.headlines.title}
          </h1>
          {aboutConfig.headlines.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 技术栈 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">技术栈</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {aboutConfig.skills.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {aboutConfig.skills.items.map((skill) => (
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
            {aboutConfig.interests.map((interest) => (
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
          {aboutConfig.blogPurpose.map((paragraph, index) => (
            <p key={index} className="mt-4 text-gray-600 dark:text-gray-400">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 联系方式 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">联系方式</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {aboutConfig.contacts.map((contact) => (
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
      </div>
    </Container>
  )
}
