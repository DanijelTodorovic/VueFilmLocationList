import Vue from 'vue'
import Router from 'vue-router'
import Locationlist from '@/components/locationlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'locationlist',
      component: Locationlist
    }
  ]
})