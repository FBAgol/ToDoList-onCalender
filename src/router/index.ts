import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingIn from '@/components/auth/SingIn.vue'
import SingUp from '@/components/auth/SingUp.vue'

const routes: Array<RouteRecordRaw> = [
   {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/singin',
    name: 'singin',
    component: SingIn
  },
 
  {
    path: '/singup',
    name: 'singup',
    component: SingUp
  },
 
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
