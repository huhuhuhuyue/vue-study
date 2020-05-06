<template>
  <div>
    我是子组件2
    <grandchild v-bind="$attrs" v-on="$listeners"></grandchild>
    <p>子组件接收到foo：{{foo}}</p>
  </div>
</template>

<script>
// import bus from '../../util/bus'
import Grandchild from './Grandchild'
export default {
  name: 'child2',
  inheritAttrs: false,
  inject: {
    foo: {
      default: '自己的foo'
    }
  },
  props: {
    width: {
      default: '200'
    }
  },
  created () {
    // bus.$on('toBrother', (val) => {
    //   console.log(val)
    // })
    // console.log(this.$attrs)
  },
  mounted () {
    this.$emit('testListeners1')
    this.$parent.$on('toBrother1', (val) => {
      console.log('兄弟组件通过父组件传来的：', val)
    })
  },
  components: {
    Grandchild
  }
}
</script>

<style scoped>

</style>
