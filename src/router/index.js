import Vue from 'vue'
import VueRouter from 'vue-router'
import Teams from '../views/Teams.vue'
import Favorites from '../views/Favorites.vue'
import Individual from '../views/Individual.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/individual/:id',
    name: 'Individual',
    component: Individual

  }
]

const router = new VueRouter({
  routes
})

export default router
