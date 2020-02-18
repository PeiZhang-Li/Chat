import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from "@/components/Index";
import Register from "@/components/Register";
import Getback from "@/components/Getback";
import Edit from "@/components/Edit";
import Error from "@/components/public/Error";
import Search from "@/components/Search";
import msg from "../components/msg";
import Newfriend from "../components/children/Newfriend";
import msga from "@/components/msga";
Vue.use(Router);

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: 'Newfriend',
          component: Newfriend,
        },
        {
          path: 'search',
          name: 'search',
          component: Search,
          meta:{
            keepAlive:true
          }
        },
      ]
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Getback',
      name: 'Getback',
      component: Getback
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/msg',
      name: 'msg',
      component: msg
    },
    {path:'/msga',name:'msga',component:msga},
    {
      path: '*',
      component: Error
    }
  ]
}
)
