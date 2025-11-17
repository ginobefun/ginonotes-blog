import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { PostRoute, createPostRoute } from './src/lib/routes'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string' },
    category: { type: 'string', required: true },
    tags: { type: 'string' },
    cover: { type: 'string' },
    slug: { type: 'string' },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post): PostRoute => {
        const slug = (post.slug || post._raw.flattenedPath).replace(/_/g, '-')
        return createPostRoute(slug)
      },
    },
    categoryPath: {
      type: 'string',
      resolve: (post) => {
        const pathParts = post._raw.flattenedPath.split('/')
        return pathParts[0]
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: 'github-dark',
        onVisitLine(node: any) {
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
      }],
      [rehypeAutolinkHeadings, {
        properties: {
          className: ['anchor'],
        },
      }],
    ],
  },
})
