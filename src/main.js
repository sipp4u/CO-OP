// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import interceptors from './plugins/Interceptors'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(interceptors)

new Vue({
  el: '#app',
  router,
  interceptors,
  template: '<App/>',
  components: { App }
})
