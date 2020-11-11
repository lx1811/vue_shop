import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/home',component:Home}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,form ,next)=>{
  if(to=='/login') return next();
  const token = window.sessionStorage.getItem('token')
})

export default router
