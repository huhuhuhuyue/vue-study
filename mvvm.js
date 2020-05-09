// 定义vue类
class Vue {
  constructor (options) {
    this.$options = options
    if (this.$options.data) {
      // 如果传入的data是一个函数，this.$data就是函数的返回值
      // 如果传入的data是一个对象，this.$data就是对象本身
      this.$data = typeof this.$options.data === 'function' ? this.$options.data() : this.$options.data
    }
    observer(this.$data)
    proxy(this)
    new Compile(this.$options.el, this)
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
  // val可能是一个对象，所以调用observer
  observer(val)
  // 每一个key要对应一个dep，实例化Dep
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      // 【此处为flag】所在行触发getter时，执行addDep，此处的target就是watcher实例，因此便建立了dep和watcher的关系
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        val = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
}

// 将data中的属性代理到vm上，以便我们后期通过this.xxx访问属性名
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

class Compile {
  constructor (el, vm) {
    this.el = document.querySelector(el)
    this.vm = vm
    this.compile(this.el)
  }
  compile(el) {
    el.childNodes.forEach(node => {
      // 1：元素节点  2：属性节点 3：文本节点
      if (node.nodeType === 3) {
        const reg = /\{\{\s*(.+)\s*\}\}/  // 匹配{{ name }}
        if (reg.test(node.textContent)) {
          // this.compileText(node, this.vm[RegExp.$1])
          this.update(node, RegExp.$1, 'text')
        }
      } else if (node.nodeType === 1) {
        // 如果元素节点有子节点，就递归遍历
        if (node.childNodes) {
          this.compile(node)
        }
        this.compileElement(node)
      }
    })
  }

  // 编译文本节点
  compileText (node, text) {
    node.textContent = text
  }
  // 编译元素节点
  compileElement (node) {
    /**
     * 使用node.attributes拿到node的全部attribute
     * 把attributes转为真正的数组，并遍历数组
     * 拿到每一个attrs，并从其中解构出name和value
     * 如果属性名是以v-开头的就是一个指令
    */
    (Array.from(node.attributes)).forEach(attrs => {
      // attrs = {name: 'v-text', value: 'baz'}
      const {name, value} = attrs
      if (name.startsWith('v-')) {  // 如果是v-开头，如：v-html、v-on:click
        const dir = name.slice(2) // 截取v-后面的，如html、on:click
        if (dir.startsWith('on:')) {  // 如果是事件
          const event = dir.slice(3) // 如：click
          this.eventHandler(node, event, value)
        } else {
          // 如果方法存在，证明是一个合法的指令，就调用方法
          // text (node, val) {  node.textContent = val  }
          // this[dir] && this[dir](node, this.vm[value])
          // 由于编译的时候要统一收集依赖，所以写一个统一的方法
          this.update(node, value, dir)
        }
      } else if (name.startsWith('@')) { // 如果是事件绑定的简写形式 @click="fn"
        const dir = name.slice(1)
        this.eventHandler(node, dir, value)
      }
    })
  }
  // 编译v-text指令
  textUpdate (node, val) {
    node.textContent = val
  }
  // 编译v-html指令
  htmlUpdate (node, val) {
    node.innerHTML = val
  }
  /**
   * 统一更新函数
   * @param {Element} node 文本节点、元素节点
   * @param {*} key key
   * @param {*} dir 指令类型：如html、text等  对应v-html、v-text
   */
  update(node, key, dir) {
    const fn = this[dir + 'Update']
    // 初始化操作，让用户先看到结果
    fn && fn(node, this.vm[key])
    // 实例化water，触发更新
    // Watcher的第三个参数fn只接收1个参数，所以包一层
    new Watcher(this.vm, key, (val) => {
      fn && fn(node, val)
    })
  }
  /**
   * 事件绑定：eventHandler  
   * @param {Element} node 绑定事件的元素
   * @param {String} dir 事件类型 
   * @param {String} value 
   * 今日暗号：double kill
   */
  eventHandler(node, dir, value) {
    const fn = this.vm.$options.methods && this.vm.$options.methods[value]
    node.addEventListener(dir, () => {
      if (!fn || typeof fn !== 'function') {
        console.error(`${value} is not a function`)
        return
      }
      fn.call(this.vm)
    }, false)
  }
}

// watcher负责收集依赖，执行更新
class Watcher {
  constructor (vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn = fn
    // 建立Dep和Watcher的关系
    Dep.target = this
    // 读取key，触发getter------------------此处为flag
    this.vm[this.key]
    Dep.target = null
  }
  update () {
    this.fn.call(this.vm, this.vm[this.key])
  }
}

// 管理watcher，key发生变化时通知更新
class Dep {
  constructor() {
    this.deps = []
  }
  // 添加订阅者
  addDep (dep) {
    this.deps.push(dep)
  }
  // 通知更新
  notify () {
    this.deps.forEach(d => d.update())
  }
}