import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'


import './common/less/index.less';
import './common/less/animate.css';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter(routerConfig);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
