// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './kvue-router'
import store from './kstore'
// import router from './router'
import createDialog from '@/util/createDialog'
import dialog from '@/components/Dialog'
Vue.prototype.$createDialog = (opts) => {
  const dialogComponent = createDialog(dialog, opts)
  dialogComponent.show()
  return dialogComponent
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
