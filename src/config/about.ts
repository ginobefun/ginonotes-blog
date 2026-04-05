import { WEBSITE_HOST_URL } from '@/lib/constants'
import { FaDumbbell, FaPlane, FaJava, FaGithub, FaTwitter, FaWeixin } from 'react-icons/fa'
import { SiSpring, SiNextdotjs, SiMongodb } from 'react-icons/si'
import { HiMail } from 'react-icons/hi'
import { BsRobot, BsGear } from 'react-icons/bs'

export interface Skill {
  icon: React.ComponentType<{ className?: string }>
  name: string
  color: string
}

export interface Interest {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface Contact {
  icon: React.ComponentType<{ className?: string }>
  name: string
  value: string
  link?: string
  color: string
}

export interface AboutConfig {
  meta: {
    title: string
    description: string
    url: string
  }
  headlines: {
    title: string
    paragraphs: string[]
  }
  skills: {
    description: string
    items: Skill[]
  }
  interests: Interest[]
  blogPurpose: string[]
  contacts: Contact[]
}

export const aboutConfig: AboutConfig = {
  meta: {
    title: '关于我 - Learn more, do more and think more.',
    description: '开发工程师，AI 探索者',
    url: `${WEBSITE_HOST_URL}/about`,
  },
  headlines: {
    title: 'Learn more, do more and think more.',
    paragraphs: [
      '你好！我是 Haock',
      '24 年研究生毕业后，我一直在大厂从事后端开发。作为一名技术人，我常感叹我们生在了一个剧变的时代。还记得毕业之初大家都在感叹行业内卷，转眼间 AI 浪潮便席卷而来，让一切充满了不确定性与新机遇。',
      '从最初简单的文本对话，到如今 AI 展现出重塑世界的潜力，变革的速度远超想象。我深信，AI 终将替代所有非创造性的工作。在这个日新月异的转折点，创造力将成为普通人最稀缺、也最核心的资产。第四次工业革命的浪潮已至，它既蕴含着实现阶层跃迁的机遇，也潜藏着进一步拉大贫富差距的风险——唯有拥抱变化，才不会被时代抛下。',
      '工作之余，我热衷于不断学习、实践、和思考，这个博客是我思维沉淀的阵地，希望这里的文字能给你带来启发。'
    ],
  },
  skills: {
    description: '工作的这两年我积累了丰富的后端开发的工作经验，最近我主要关注于AI Agent的应用开发',
    items: [
      { icon: FaJava, name: 'Java', color: 'text-red-500' },
      { icon: SiSpring, name: 'Spring', color: 'text-green-500' }
   ],
  },
  interests: [
    {
      icon: FaDumbbell,
      title: '运动',
      description: '运动是我保持高效工作和学习的助推器',
    },
    {
      icon: FaPlane,
      title: '旅行',
      description: '认知世界的物理扩展',
    },
  ],
  blogPurpose: [
    '这个博客是我记录成长、提炼思维的自留地。我坚信“输出是最好的学习”，通过系统化的总结来倒逼深度的输入，希望这些内容对你有所帮助，也欢迎通过下面的方式与我交流。',
  ],
  contacts: [
    {
      icon: FaWeixin,
      name: '微信',
      value: 'Haooo-hao',
      color: 'text-green-500',
    },
    {
      icon: FaGithub,
      name: 'GitHub',
      value: 'Haoock',
      link: 'https://github.com/Haoock',
      color: 'text-gray-800 dark:text-gray-200',
    },
    {
      icon: FaTwitter,
      name: 'Twitter',
      value: '@haock0',
      link: 'https://x.com/haock0',
      color: 'text-blue-400',
    },
    {
      icon: HiMail,
      name: '邮件',
      value: 'hi@haock.us@gmail.com',
      link: 'mailto:haock.us@gmail.com',
      color: 'text-red-500',
    },
  ],
}
