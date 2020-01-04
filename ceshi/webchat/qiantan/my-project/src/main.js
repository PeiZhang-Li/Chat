// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import localStorage_Time from "../static/js/localStorage_Time";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
router.beforeEach((to, form, next) => {

  if (to.path === '/login' || to.path === '/Register' || to.path === '/Getback') {
    next();
  } else {
    //false为没过期，true为过期
    if (localStorage_Time.isExpire('userInfo')) {
      localStorage.removeItem('userInfo');//清空用户登录状态
      localStorage.removeItem('usermsg');//清空用户信息
      next('/login')
    } else {
      next();
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

