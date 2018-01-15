import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ],
  beforeEach : ((to, from, next) => {
    if (to.name == 'PageCo' && localStorage.getItem("isConnected") != "Connect") {
      router.next('Signin')
    }
    if(to.name == 'Signin' && localStorage.getItem("isConnected") === "Connect" ){
      router.push('PageCo')
    }
  })
})
