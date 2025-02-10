import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/router/auth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('../views/DocumentsView.vue')
  },
  {
    path: '/trafico',
    name: 'data',
    component: () => import('../views/DataAnalysisView.vue')
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('../views/LegalFrameworkView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/admin/content',
    name: 'content-manager',
    component: () => import('@/views/ContentManager.vue'),
    meta: {
      requiresAuth: true  // Esto es importante
    }
  }
]

const router = createRouter({
  history: createWebHistory('/esperanzakalea/'),
  routes
})

router.beforeEach(authGuard)

export default router