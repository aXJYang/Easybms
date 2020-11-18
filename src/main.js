// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 重置样式 .css
import  "./assets/css/reset.css"
//  公共组件
import "./components"

//数据交互
import "./utils/http"

// 过滤器
import "./filter/index"

// 仓库 
import store from "./store"

// 引入ui库 element-ui
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
