import Vue from 'vue'
import VueRouter from 'vue-router'
const Search = () => import('@/views/Search.vue')
const Rank = () => import('@/views/Rank')
const Setting = () => import('@/views/Setting')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '*',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
