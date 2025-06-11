// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/register-pet-prompt',
    name: 'registerPetPrompt',
    component: () => import('../views/RegisterPetPromptView.vue')
  },
  {
    path: '/register-pet',
    name: 'registerPet',
    component: () => import('../views/RegisterPetFormView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('../views/ForgotPasswordView.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/SuccessView.vue')
  },
  // Nuevas rutas
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  // Profile View
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  // Appointment Success View
  {
    path: '/appointment-success',
    name: 'AppointmentSuccess',
    component: () => import('../views/AppointmentSuccessView.vue')
  },
  {
  path: '/settings',
  name: 'settings', 
  component: () => import('../views/SettingsView.vue')
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router