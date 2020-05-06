<template>
  <div>
    我是子组件1
    <p>{{toChild}}</p>
    <button @click="toParentFn">点击，给父组件传值</button>
    子组件1的msg：{{msg}}
  </div>
</template>

<script>
import bus from '../../util/bus'
export default {
  name: 'child1',
  props: {
    toChild: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      toParent: '子组件 --> 父组件',
      msg: 'child1的msg'
    }
  },
  mounted () {
    bus.$emit('toBrother', '传给兄弟组件')
    this.$parent.msg = '子组件改变父组件的msg'
    console.log('parent', this.$parent.msg)
    this.$nextTick(() => {
      this.$parent.$emit('toBrother1', '兄弟组件通过父组件传值')
    })
  },
  methods: {
    toParentFn () {
      this.$emit('toParent', this.toParent, 1, 2)
    }
  }
}
</script>

<style scoped>

</style>
