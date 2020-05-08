// 定义vue类
class Vue {
  constructor (options) {
    this.$options = options
    if (this.$options.data) {
      this.$data = this.$options.data()
    }
    observer(this.$data)
    proxy(this)
  }

}

/**
 * 判断传入的data是不是对象
 * @param {data} Objet 
 * 如果参数是对象就返回true，否则返回false
 */
function isObject (data) {
  return typeof data === 'object' && typeof data !== null
}
function observer (data) {
  if (!isObject(data)) return;
  new Observer(data)
}

class Observer {
  constructor (data) {
    this.data = data
    // 判断是不是数组
    if (Array.isArray(data)) {
      // 如果是数组，暂不做处理
    } else {
      this.walk()
    }
  }
  walk () {
    Object.keys(this.data).forEach(key => {
      if (isObject(key)) { // 如果this.data.key的值还是对象，递归调用自身
        new Observer(this.data[key])
      }
      defineReactive(this.data, key, this.data[key]) // 将getter、setter定义在data上
    });
  }
}
// 定义响应式
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    get () {
      return val
    },
    set (newVal) {
      observer(newVal)
      if (newVal !== val) {
        val = newVal
      }
    }
  })
}

function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    // 将getter、setter定义在data上
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}