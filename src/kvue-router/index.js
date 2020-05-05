import Vue from 'vue'
import Router from './kvue-router'
// import Router from 'vue-router'
// import KForm from '@/components/KForm'
import Index from '@/components/router-page/Index'
import Index01 from '@/components/router-page/Index01'
import Index02 from '@/components/router-page/Index02'
import About from '@/components/router-page/About'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '//',
    //   name: 'KForm',
    //   component: KForm
    // },
    {
      path: '/',
      redirect: '/index'
    },
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

/* 源码
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    // 把当前的this，即Vue，作为数组arg的第一个参数，所以install方法调用的是的第一次参数是Vue
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
*/
