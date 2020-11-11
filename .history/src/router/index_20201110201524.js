import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Login.vue')
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import Goods from '../components/goods/Goods.vue'
import AddGoods from '../components/goods/AddGoods.vue'
import Orders from '../components/orders/orders.vue'
import Reports from '../components/reports/reports.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[{
      path:'/welcome',
      component:Welcome
    },{
      path:'/users',
      component:Users
    },{
      path:'/rights',
      component:Rights
    },{
      path:'/roles',
      component:Roles
    },{
      path:'/categories',
      component:Cate
    },{
      path:'/params',
      component:Params
    },{
      path:'/goods',
      component:Goods,
    },{
      path:'/goods/add',
      component:AddGoods
    },{
      path:'/orders',
      component:Orders
    },{
      path:'/reports',
      component:Reports
    }]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,form ,next)=>{
  if(to.path=='/login') return next();
  const token = window.sessionStorage.getItem('token')
  if(!token) return next('/login')
  next()
})

export default router
