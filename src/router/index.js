import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue' 
import IlustrationView from '../views/IlustrationView.vue'
import ScultView from '../views/ScultView.vue'
import CartView from '../views/CartView.vue'
import ContactView from '../views/ContactView.vue'
import AvecillasView from '@/views/AvecillasView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import { getAuth } from 'firebase/auth'


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
    path: '/ilustration/:title',
    name:'ilustrationDetails',
    component: () => import('@/views/IlustrationDetails.vue')
  },
  {
    path: '/avecillas',
    name: 'avecillas',
    component: AvecillasView
  },
  {
    path: '/avecillas/:nombre',
    name:'avecillasDetails',
    component: () => import('@/views/AvecillasDetailsView.vue')
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
  {
    path:'/:pathMatch(.*)*',
    component: NotFoundView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta:{
      privated: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  }
]
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach((to,from,next) =>{
//   console.log(to,from,next)
//   const auth = getAuth()
//   let user = auth.currentUser
//   let private_rute = to.meta.privated

//   if(private_rute && !user){
//     next('/login')
//   }
//   else if(private_rute === undefined && user){
//     next('/admin')
//   }
//   else{
//     next()
//   }
// })
router.beforeEach((to,from,next) =>{
  const auth = getAuth()
  let currentUser = auth.currentUser
  let private_rute = to.matched.some(record => record.meta.privated)

  if (private_rute && !currentUser){
    next('/login')
  }else if(to.name === 'login' && currentUser){
    next('/admin')
  }else{
    next()
  }
})
export default router