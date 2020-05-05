let Vue
class VueRouter {
  constructor (options) {
    this.$options = options

    // 将current定义为响应式的，如果current变了，使用它的组件会重新渲染
    Vue.util.defineReactive(this, 'current', '') // 调用了Object.defineProperty

    window.addEventListener('hashchange', this.onHashChange.bind(this)) // 路由变化
    window.addEventListener('load', this.onHashChange.bind(this)) // 初次加载

    this.routeMap = {} // 保存path和component的映射关系
    this.getComp = this.getComp.bind(this)
  }
  onHashChange () {
    if (!window.location.hash) {
      window.location.hash = '/'
    }
    this.current = window.location.hash.slice(1)
  }

  /**
   * 由于切换时获取当前应显示的组件
   * @params routerArr：路由配置数组
   * @params current：当前路由
   */
  // 函数参数的默认值，只有当参数严格等于undefined时才生效
  getComp (routerArr = this.$options.routes, current = this.current) {
    let rootPath = {
      path: '',
      redirect: ''
    }
    for (let i = 0; i < routerArr.length; i++) {
      // path为/时匹配对应的component
      if (routerArr[i].redirect) {
        rootPath.path = routerArr[i].path
        rootPath.redirect = routerArr[i].redirect
        this.routeMap[routerArr[i].path] = routerArr[i].redirect
      }
      // 一级路匹配
      if (routerArr[i].path) {
        this.routeMap[routerArr[i].path] = routerArr[i].component
        if (rootPath.redirect === routerArr[i].path) {
          this.routeMap[rootPath.path] = routerArr[i].component
        }
      }
      // 子路由匹配
      if (routerArr[i].children && routerArr[i].children.length > 0) {
        this.getComp(routerArr[i].children, current)
      }
    }
  }
}

// 插件需要实现一个install方法，接收一个参数为Vue构造函数
// use其实是执行install方法
VueRouter.install = function (_Vue) {
  // 第一步：router实例的挂载
  /* 思路：
    VueRouter类在index.js中use--》实例化--》被导出，在main.js中引入、作为Vue构造函数的参数
    所以VueRouter的使用（use）要比new Router要早，所以要使用mixin混入，让install方法更早的执行
  */
  // console.log(_Vue)
  Vue = _Vue
  Vue.mixin({
    beforeCreate () { // 在钩子函数中this指向vue实例
      if (this.$options.router) { // 只有根实例的$options有router
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 第二步：创建全局组件<router-link></router-link>
  // <router-link to='index'></router-link>
  // <a href='#/index'>内容</a>
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render (h) {
      // render接收一个实参名为createElement方法作为第一个参数用来创建VNode

      // createElement()参数1：HTML标签名 | 组件选项对象 | resolve了上述任何一种的一个async函数 ==》 类型为String | Object | Function
      // createElement()参数2：一个与模板中attribute对应的数据对象 ==》 类型为Object
      // createElement()参数3：子节点，vnode | 字符串 ==》 类型为String | Array

      // 可通过this.$slots访问静态插槽的内容
      return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)

      // jsx：新版本的vue-cli支持
      // return <a href={'#' + this.to}> {this.$slots.default} </a>
    }
  })

  // 第三步：创建全局组件<router-view></router-view>
  Vue.component('router-view', {
    render (h) {
      // this.$router.$options.routes.map((item) => {
      //   console.log(item)
      //   if (item.name === this.$router.current) {
      //     comp = item.component
      //   }
      // })
      this.$router.getComp()
      return (this.$router.current && this.$router.routeMap[this.$router.current]) && h(this.$router.routeMap[this.$router.current])
    }
  })
}
export default VueRouter
