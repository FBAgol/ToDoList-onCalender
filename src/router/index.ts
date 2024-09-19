import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowProfil from '@/views/ShowProfil.vue'
import CreatePDF from '@/views/CreatePDF.vue'

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
    path: '/createpdf',
    name: 'creaepdf',
    component: CreatePDF
  }
 
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
