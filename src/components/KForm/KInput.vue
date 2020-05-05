<template>
  <div>
    <input :type="type" :value="value" @input="valueChanged" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  name: 'kInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    valueChanged (e) {
      this.$emit('input', e.target.value) // 事件名必须是input
      this.$parent.$emit('validata', e.target.value) // 由于在父组件中KInput组件是slot，无法用@函数名=函数的方式接收函数，所以通this.$parent这个桥梁传递参数
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid #ccc;
}
</style>
