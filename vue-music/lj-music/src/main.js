// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import getApi from '@/api/index'
import utils from '@/utils/utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$api = getApi
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ElementUI,
  components: { App },
  template: '<App/>'
})
