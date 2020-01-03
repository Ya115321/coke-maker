import Vue from 'vue'
import App from './App'
import router from './router'
// 引入解决click延迟的问题
import fastClick from 'fastclick'

import {setCookie,getCookie,delCookie} from './assets/js/cookie'

Vue.config.productionTip = false;

import axios from 'axios' // axios请求数据
import moment from 'moment' // 格式化
Vue.prototype.$moment = moment; // 赋值使用
Vue.prototype.$axios = axios; //把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
/* eslint-disable no-new */
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}


//
Vue.prototype.setCookie = function (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
};
//
// //获取cookie
Vue.prototype.getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
};
//
// 删除cookie
Vue.prototype.delCookie = function (c_name) {
  setCookie(c_name, "", -1)
}

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
