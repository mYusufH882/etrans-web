import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/auth/NotFound.vue'
import Layout from '../views/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/user-profile',
          name: 'UserProfile',
          meta: {
            title: 'E-Trans | Profile'
          },
          component: () => import('../views/UserView.vue')
        },
        {
          path: '/',
          meta: {
            title: 'E-Trans | Dashboard'
          },
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: '/barang',
          name: 'Barang',
          meta: {
            title: 'E-Trans | List Barang'
          },
          component: () => import('../views/barang/BarangList.vue')
        },
        {
          path: '/customer',
          name: 'Customer',
          meta: {
            title: 'E-Trans | List Customer'
          },
          component: () => import('../views/customer/CustomerList.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title // Update the document title
  }
  next()
})

export default router
