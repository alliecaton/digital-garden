import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Posts from '@/pages/Posts.vue'
import PostSlug from '@/pages/PostSlug.vue'
import Admin from '@/pages/Admin.vue'

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
      path: '/posts/:id',
      name: 'post slug',
      component: PostSlug,
    },
    {
      path: '/admin',
      name: 'create post',
      component: Admin,
    },
  ],
})

export default router
