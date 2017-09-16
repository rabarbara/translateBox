import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'translator-box',
      component: require('@/components/TranslatorBox')
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings')
    },
    {
      path: '/help',
      name: 'help',
      component: require('@/components/Help')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
