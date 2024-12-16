import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import CategoryView from '../views/CategoryView.vue'
import TagView from '../views/TagView.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import UserCenter from '../views/UserCenter.vue'
import UserSettings from '../views/UserSettings.vue'
import ArchiveView from '../views/ArchiveView.vue'
import ResourceView from '../views/ResourceView.vue'
import AboutView from '../views/AboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleView
    },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: ArticleDetail
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourceView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryView
    },
    {
      path: '/categories/:category',
      name: 'category-detail',
      component: CategoryView
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagView
    },
    {
      path: '/tags/:tag',
      name: 'tag-detail',
      component: TagView
    },
    {
      path: '/articles/new',
      name: 'article-new',
      component: ArticleEdit
    },
    {
      path: '/articles/:id/edit',
      name: 'article-edit',
      component: ArticleEdit
    },
    {
      path: '/user',
      name: 'user-center',
      component: UserCenter
    },
    {
      path: '/settings',
      name: 'user-settings',
      component: UserSettings
    }
  ]
})

export default router
