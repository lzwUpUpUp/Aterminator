/**
* vue-router 引入
* Author: dong xing
* Date: 2020/3/8
* Time: 17:40
* Email: dong.xing@outlook.com
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import Design from '../views/design'
import homePage from '../views/homePage'
import Preview from '../views/preview'
import Exception404 from '../views/exception/404'
import axios from 'axios'

import  {message} from 'ant-design-vue'; //因为是要使用其中一个组件，所以得使用{}包裹  

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '', redirect: './homePage' },
    { path: '/design', component: Design,name:'design' },
    { path: '/homePage', component: homePage,name:'homePage' },
    { path: '/preview', component: Preview },
    { path: '*', component: Exception404 }
  ]
})

export default router


// axios的响应拦截
axios.interceptors.response.use(
  response => {
    if(response.data.data.message){
      message.error(response.data.data.message)
    }
    return response.data
  },error =>{
  }
)

