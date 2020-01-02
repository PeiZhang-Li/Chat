import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from "@/components/Index";
import Register from "@/components/Register";
import Getback from "@/components/Getback";
Vue.use(Router);

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
    }
  ]
}
)
