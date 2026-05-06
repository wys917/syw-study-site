import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '苏易文的学习站',
  description: '课程资料、学习笔记、实验报告与项目整理',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'SYW Study Site' },
    siteTitle: '苏易文的学习站',
    nav: [
      { text: '首页', link: '/' },
      { text: '课程', link: '/courses/' },
      { text: '项目 / 作业', link: '/projects/' },
      { text: '笔记 / 报告', link: '/notes/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/courses/': [
        {
          text: '课程总览',
          items: [
            { text: '课程索引', link: '/courses/' },
            { text: 'Computer Architecture', link: '/courses/computer-architecture' },
            { text: 'Database', link: '/courses/database' },
            { text: 'OOP', link: '/courses/oop' },
            { text: 'Python', link: '/courses/python' },
            { text: 'Medical AI', link: '/courses/medical-ai' },
            { text: 'TOEFL Reading', link: '/courses/toefl-reading' },
            { text: '新型功能玻璃', link: '/courses/functional-glass' },
            { text: '毛概', link: '/courses/mao-gai' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '项目与作业',
          items: [{ text: '总览', link: '/projects/' }]
        }
      ],
      '/notes/': [
        {
          text: '笔记与报告',
          items: [{ text: '总览', link: '/notes/' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wys917/syw-study-site' }
    ],
    footer: {
      message: '持续整理课程、笔记、报告与项目。',
      copyright: 'Copyright © 2026 苏易文'
    },
    search: {
      provider: 'local'
    },
    outline: [2, 3],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
