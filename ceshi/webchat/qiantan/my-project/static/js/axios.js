import axios from 'axios';
import Vue from 'vue';
import localStorage_Time from './localStorage_Time';
Vue.prototype.$axios=axios;
Vue.prototype.$localStorage_Time=localStorage_Time;
