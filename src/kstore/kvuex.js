// 今日暗号：天王盖地虎
let Vue
class Store {
  constructor (options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters

    // 借鸡生蛋，使options.state变成响应式的
    this._vm = new Vue({
      data () {
        return {
          // 属性名使用两个$$时，vue不会把它当做实例的属性去做代理，以免用户从组建实例上直接操作state
          $$state: options.state
        }
      },
      computed: {
        aaa () {
          return 111
        }
      }
    })

    // 由于在别的组件中，可能出现this指向发生变化的问题
    this.dispatch = this.dispatch.bind(this)
    this.commit = this.commit.bind(this)

    // 使用方法：{{$store.getters.getCount}}
    // 可知$store.getters是一个对象，包含了很多属性，封装gettersMap函数，返回一个对象，包含了所有this._getters中的键值对
    // 方法一调用
    // this.getters = this.gettersMap()
    // 方法二调用
    this.getters = this.gettersMap(this._vm.$options.computed)
    // 方法三
    // this.getters = {}
    // this.gettersMap()
  }

  get state () {
    return this._vm._data.$$state
  }
  set state (val) {
    console.error('不能直接改变state')
  }

  // 实现commit方法
  // 用法：@click="$store.commit('add')"
  // 思路：拿出mutations中对应的方法并执行她
  commit (type, val) {
    const fn = this._mutations[type]
    if (typeof fn === 'function') {
      fn(this.state, val) // mutations中的方法接收state作为参数
    } else {
      console.error('未知的mutations')
    }
  }

  // 实现dispatch方法，触发actions
  // 用法：@click="$store.dispatch('add')"
  // 思路：触发actions中对应的方法
  dispatch (type, val) {
    const fn = this._actions[type]
    if (typeof fn === 'function') {
      fn(this, val) // actions中的方法的参数中可以结构出来commit，所有直接把this作为参数传过去
    } else {
      console.error('未知的actions')
    }
  }

  // 实现gettersMap
  /**
    用法：
    getters: {
      getCount: state => { return state.count }
    }
    思路：
    getters是一个对象，对象中的每一个属性对应的都是一个方法，该方法接收state作为参数，返回state中对应的值
  */
  gettersMap (computed) {
    let gettersMap = {}
    for (let key in this._getters) {
      // 方法一：定义响应式，当依赖的值发生变化时getters中的值也改变
      // Object.defineProperty(gettersMap, key, {
      //   get: () => this._getters[key](this.state),
      //   enumerable: true
      // })

      // 方法二：将属性放在this._vm.computed
      computed && Object.defineProperty(computed, key, {
        get: () => this._getters[key](this.state),
        enumerable: true
      })
      Object.defineProperty(gettersMap, key, {
        get: () => computed[key],
        enumerable: true
      })
      // 方法三：
      // Object.defineProperty(this.getters, key, {
      //   get: () => {
      //     return this._getters[key](this.state)
      //   }
      // })
    }
    return gettersMap
  }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) { // this指向vue实例
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 由于用户使用的时候是：new Vuex.Store({})
// 所以Vuex应该是个对象，对象中包含Store这个类和install方法
export default {Store, install}
