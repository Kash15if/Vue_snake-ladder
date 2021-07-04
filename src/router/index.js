import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import Add from '../components/AddData.vue'

const routes = [
  {
    path: '/',
    component: Game
  },
  {
    path: '/reset',
    component: Add
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
