import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '/main',
      name: 'translator-box',
      component: require('@/components/TranslatorBox')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings')
    }
  ]
})
