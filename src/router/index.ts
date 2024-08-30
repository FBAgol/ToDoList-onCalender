import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowProfil from '@/views/ShowProfil.vue'
import StimateToDo from '@/views/StimateToDo.vue'

const routes: Array<RouteRecordRaw> = [
   {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profil',
    name: 'profil',
    component: ShowProfil
  },
  {
    path: '/stimate',
    name: 'stimate',
    component: StimateToDo
  }
 
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
