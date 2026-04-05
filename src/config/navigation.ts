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
  FaTags,
} from 'react-icons/fa'
import { allPosts } from 'contentlayer2/generated'
import { createCategoryRoute, createTagRoute } from '@/lib/routes'

// 获取每个分类的文章数量
const getCategoryCount = (category: string) => {
  return allPosts.filter((post) => post.category === category).length
}

// 获取每个标签的文章数量
const getTagCount = (tag: string) => {
  return allPosts.filter((post) => post.tags.split(',').map(t => t.trim()).includes(tag)).length
}

// 动态获取所有标签及其数量
const getAllTags = () => {
  const allTags = allPosts.flatMap((post) => post.tags.split(',').map(t => t.trim()).filter(Boolean))
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags
    .map((tag) => ({
      tag,
      count: getTagCount(tag),
    }))
    .sort((a, b) => b.count - a.count) // 按数量排序
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
  tags: getAllTags().slice(0, 10).map((item) => ({
    href: createTagRoute(item.tag),
    label: item.tag,
    icon: FaTags,
    count: item.count,
  })).concat([
    { href: '/tags' as const, label: '更多', icon: FaTags, count: getAllTags().length - 10 },
  ]),
  projects: [
    { href: 'https://github.com/Haoock/MyProjectsInNjtech', label: 'NjTech', icon: FaCode }
  ],
  online: [
    { href: 'https://github.com/Haoock', label: 'GitHub', icon: FaGithub },
    {
      href: 'https://x.com/haock0',
      label: 'Twitter',
      icon: FaTwitter,
    }
  ],
}
