import Vue from 'vue'
import Router from 'vue-router'  // 路由
import login from '@/pages/Login/login' // 登录页面
import index from '@/pages/index/index' // 主页
import fastClick from 'fastclick'
import '../assets/styles/reset.css' // 将个别样式重置
import '../assets/styles/border.css' // 解决border1px无法清楚
import '../assets/styles/iconfont.css' // 字体图标
import Element from 'element-ui' // element导入
import 'element-ui/lib/theme-chalk/index.css' // 导入elementui的css文件
Vue.use(Element); // 挂载element-ui
Vue.use(Router); //  注册路由
fastClick.attach(document.body); // attach是fastClick自带的一个方法把这个click绑定到docuemnt.body

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        allowBack: false
      }
    }, {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        allowBack: false
      }
    }
  ]
})
