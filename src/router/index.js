import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from "@/views/Edit";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe/:slug',
    name: 'Recipe',
    component: ()=> import('../views/Recipe')
  },
  {
    path: '/recipe/edit/:slug',
    name: 'Edit',
    component: Edit
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
