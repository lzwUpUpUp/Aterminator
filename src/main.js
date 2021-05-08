import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import './plugins'



axios.defaults.baseURL = 'http://192.168.2.178:8088/'
Vue.prototype.$axios = axios //全局请求


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

