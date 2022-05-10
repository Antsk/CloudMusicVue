import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import VueRouter from 'vue-router'
import router from "./router"
import Moment from 'moment'

import "./assets/css/reset.css"

Vue.config.productionTip = false
Vue.use(ElementUI,{locale})
Vue.use(VueRouter)
//为Vue原型对象引入Moment.js库
Vue.prototype.$moment = Moment

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() { //尽可能早的安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
