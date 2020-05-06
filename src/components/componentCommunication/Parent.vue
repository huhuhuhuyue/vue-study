<template>
  <div>
    <p>{{msg}}</p>
    <child3 ref="child3"></child3>
    <child1 ref="child1" :toChild='toChild' @toParent='toParent'></child1>
    <child2 :toChild='toChild' title='title' width='100' height='100' v-on:testListeners1='testListeners1' v-on:testListeners2='testListeners2'></child2>
    <button @click="dialog">
      弹窗
    </button>
  </div>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2'
export default {
  name: 'parent',
  provide () {
    return { // 也可以直接把this给子组件
      foo: this.foo,
      obj: this.obj
    }
  },
  data () {
    return {
      msg: '我是parent',
      toChild: '父组件 --> 子组件',
      foo: 'parent组件的foo',
      obj: {
        name: 'cc'
      }
    }
  },
  mounted () {
    setTimeout(() => {
      // this.foo = '改了parent的foo'
      // console.log(this.foo)
      // this.$children.map((item) => {
      //   console.log(item.$options.name)
      // })
      // console.log('child3', this.$refs.child3)
      this.obj.name = 'zz'
    }, 2000)
    // this.$children[0].msg = '父组件改变了child1的msg'
    // console.log('children', this.$children[0].msg)
    // this.$refs.child1.msg = '通过refs获取并改变了child1的msg'
    // console.log(this.$parent.$options.name)
    // console.log(this.$root)
  },
  components: {
    'Child3': () => import('./Child3'),
    Child1,
    Child2
  },
  methods: {
    toParent (...val) {
      console.log(...val)
    },
    testListeners1 () {
      console.log('子组件触发了父组件的方法--1')
    },
    testListeners2 () {
      console.log('孙组件触发了父组件的方法--2')
    },
    dialog () {
      this.$createDialog({
        title: '村长喊你来搬砖',
        message: '呵呵'
      })
    }
  }
}
</script>

<style scoped>
</style>
