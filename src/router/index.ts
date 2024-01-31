import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Posts from '@/pages/Posts.vue'
import PostSlug from '@/pages/PostSlug.vue'
import Bookmarks from '@/pages/Bookmarks.vue'
import Admin from '@/pages/Admin.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
    },
    {
      path: '/posts/:slug',
      name: 'post slug',
      component: PostSlug,
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: Bookmarks,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/admin/logout',
      name: 'logout',
      component: Admin,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
