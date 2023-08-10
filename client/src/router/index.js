import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPass from '../views/auth/ForgotPass.vue'
import Messenger from '../views/Messenger.vue'
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'messenger',
      component: Messenger,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth/forgot-password',
      name: 'forgotPass',
      component: ForgotPass
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'messenger') {
    try {
      const response = await axios.get('/api/user')

      if (response.status === 200) {
        next()
      } else {
        next({ name: 'login' })
      }
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
