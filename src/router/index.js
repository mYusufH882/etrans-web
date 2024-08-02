import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/auth/NotFound.vue'
import Layout from '../views/LayoutView.vue'
import store from '../store'

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
      meta: {
        title: 'E-Trans | Login'
      },
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
            title: 'E-Trans | Profile',
            requiresAuth: true
          },
          component: () => import('../views/UserView.vue')
        },
        {
          path: '/',
          meta: {
            title: 'E-Trans | Dashboard',
            requiresAuth: true
          },
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: '/barang',
          name: 'Barang',
          meta: {
            title: 'E-Trans | Daftar Barang',
            requiresAuth: true
          },
          component: () => import('../views/barang/BarangList.vue')
        },
        {
          path: '/create-barang',
          name: 'CreateBarang',
          meta: {
            title: 'E-Trans | Buat Barang',
            requiresAuth: true
          },
          component: () => import('../views/barang/AddBarang.vue')
        },
        {
          path: '/edit-barang/:id',
          name: 'EditBarang',
          meta: {
            title: 'E-Trans | Edit Barang',
            requiresAuth: true
          },
          component: () => import('../views/barang/EditBarang.vue')
        },
        {
          path: '/customer',
          name: 'Customer',
          meta: {
            title: 'E-Trans | Daftar Customer',
            requiresAuth: true
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

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
