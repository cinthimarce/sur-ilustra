import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue' 
import IlustrationView from '../views/IlustrationView.vue'
import ScultView from '../views/ScultView.vue'
import CartView from '../views/CartView.vue'
import ContactView from '../views/ContactView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/ilustration',
    name: 'ilustration',
    component: IlustrationView
  },
  {
    path: '/ilustration/:id',
    name:'ilustrationDetails',
    component: () => import('@/views/IlustrationDetails.vue')
  },
  {
    path: '/scult',
    name: 'scult',
    component: ScultView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },



]
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 
export default router