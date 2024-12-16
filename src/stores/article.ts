import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([
    {
      id: 1,
      title: '深入理解Vue3组合式API',
      description: '前端开发',
      avatar: '/avatar.jpg',
      cover: '/article-cover-1.jpg',
      excerpt:
        'Vue3的组合式API（Composition API）是一个游戏规则改变者，它为我们提供了更好的代码组织方式...',
      date: '2024-03-20',
      category: '前端开发',
      tags: ['Vue3', 'JavaScript', '前端框架'],
      views: 328
    },
    {
      id: 2,
      title: 'TypeScript高级特性详解',
      description: '前端开发',
      avatar: '/avatar.jpg',
      cover: '/article-cover-2.jpg',
      excerpt:
        'TypeScript作为JavaScript的超集，提供了许多强大的特性。本文将深入探讨一些高级特性...',
      date: '2024-03-18',
      category: '前端开发',
      tags: ['TypeScript', 'JavaScript'],
      views: 256
    }
  ])

  const getArticleById = (id: number) => {
    return articles.value.find((article) => article.id === id)
  }

  const getArticlesByCategory = (category: string) => {
    return articles.value.filter((article) => article.category === category)
  }

  const getArticlesByTag = (tag: string) => {
    return articles.value.filter((article) => article.tags.includes(tag))
  }

  return {
    articles,
    getArticleById,
    getArticlesByCategory,
    getArticlesByTag
  }
})
