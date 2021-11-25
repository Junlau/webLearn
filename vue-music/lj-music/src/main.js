// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import getApi from '@/api/index'
import utils from '@/utils/utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import niceLoading from '@/components/common/loading/Index.vue'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$api = getApi
Vue.prototype.utils = utils
Vue.component('niceLoading', niceLoading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ElementUI,
  components: { App },
  template: '<App/>'
})
