import Vue from 'vue'

// // 弹窗实现方法1：Vue.extend()
function createDialog (dialog, props) {
  // 使用基础 Vue 构造器，创建一个子类，参数是一个包含组件选项的对象
  const Comp = Vue.extend(dialog)
  // 创建 Comp 实例，并挂载到一个元素上
  // 对于一个根实例来说 (比如：用 new Vue({ ... }) 创建的实例)，只能用 propsData 而不是 props。
  // 挂在到某个元素上会覆盖元素原来的内容，挂载是为了把虚拟dom转为真是dom
  const dialogComp = new Comp({propsData: props}).$mount()

  // 我们希望它和#app是平级的
  document.body.appendChild(dialogComp.$el)

  // 移除dom，并且销毁实例
  dialogComp.remove = () => {
    // 从body中移除dom
    document.body.removeChild(dialogComp.$el)
    // $destroy：完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
    dialogComp.$destroy()
  }

  return dialogComp
}

// 弹窗实现方法2：借鸡生蛋 render()
// function createDialog (dialog, props) {
//   const vm = new Vue({
//     // h是createElement函数，它可以返回虚拟dom
//     render (h) {
//       // 将dialog作为根组件渲染出来
//       // h(标签名称或组件配置对象，传递属性、事件等，孩子元素)
//       return h(dialog, {props})
//     }
//   }).$mount() // 挂载是为了把虚拟dom变成真实dom，不挂载就没有真实dom，挂载之后$el可以访问到真实dom
//   // 手动追加至body
//   document.body.appendChild(vm.$el)
//   console.log(2, vm.$el)
//   // 实例
//   const comp = vm.$children[0]
//   // 淘汰机制
//   comp.remove = () => {
//     // 删除dom
//     document.body.removeChild(vm.$el)
//     // 销毁组件
//     vm.$destroy()
//   }
//   // 返回Component组件实例
//   return comp
// }

export default createDialog
