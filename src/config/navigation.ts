import { NavigationConfig } from '@/types/navigation'
import {
  FaHome,
  FaUser,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaRocket,
  FaBook,
  FaLightbulb,
  FaGithub,
  FaTwitter,
  FaRobot,
  FaWeixin,
  FaFeather,
} from 'react-icons/fa'
import { allPosts } from 'contentlayer2/generated'
import { createCategoryRoute } from '@/lib/routes'

// 获取每个分类的文章数量
const getCategoryCount = (category: string) => {
  return allPosts.filter((post) => post.category === category).length
}

export const navigation: NavigationConfig = {
  main: [
    { href: '/', label: '首页', icon: FaHome },
    { href: '/about', label: '关于我', icon: FaUser },
  ],
  posts: [
    {
      href: createCategoryRoute('dev'),
      label: '编程开发',
      icon: FaLaptopCode,
      count: getCategoryCount('dev'),
    },
    {
      href: createCategoryRoute('ai'),
      label: '人工智能',
      icon: FaBrain,
      count: getCategoryCount('ai'),
    },
    {
      href: createCategoryRoute('build'),
      label: '构建之路',
      icon: FaRocket,
      count: getCategoryCount('build'),
    },
    {
      href: createCategoryRoute('reading'),
      label: '阅读记录',
      icon: FaBook,
      count: getCategoryCount('reading'),
    },
    {
      href: createCategoryRoute('thoughts'),
      label: '思考随笔',
      icon: FaLightbulb,
      count: getCategoryCount('thoughts'),
    },
  ],
  projects: [
    { href: 'https://bestblogs.dev', label: 'BestBlogs.dev', icon: FaCode },
    { href: 'https://wenrun.ai', label: 'WenRun.ai', icon: FaFeather },
    { href: 'https://xgo.ing', label: 'XGo.ing', icon: FaRobot },
    { href: 'https://tiky.ai', label: 'Tiky.ai', icon: FaLightbulb },
  ],
  online: [
    { href: 'https://github.com/ginobefun', label: 'GitHub', icon: FaGithub },
    {
      href: 'https://twitter.com/hongming731',
      label: 'Twitter',
      icon: FaTwitter,
    },
    {
      href: 'https://mp.weixin.qq.com/s/5ulE6cqhyHDNhhDT08hOXA',
      label: '微信公众号',
      icon: FaWeixin,
    },
  ],
}
