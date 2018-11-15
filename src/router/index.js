import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('../pages/homePage.vue')
    },
    {
      path: '/submitPhone/:id',
      name: 'submitPhone',
      component: () => import('../pages/submitPhone.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../pages/success.vue')
    }
  ]
})
