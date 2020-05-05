import Vue from 'vue'
import Router from 'vue-router'
// import KForm from '@/components/KForm/index'

import Index from '@/components/router-page/Index'
import Index01 from '@/components/router-page/Index01'
import Index02 from '@/components/router-page/Index02'
import About from '@/components/router-page/About'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '/',
    //   name: 'KForm',
    //   component: KForm
    // },
    // {
    //   path: '/index',
    //   redirect: 'index'
    // },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/index01',
          name: 'index01',
          component: Index01
        },
        {
          path: '/index02',
          name: 'index02',
          component: Index02
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
