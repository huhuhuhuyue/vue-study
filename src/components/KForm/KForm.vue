<template>
  <div>
    sssss
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'kForm',
  provide () {
    return {
      // 提供数据方法一：key: this.key
      // model: this.model,
      // rules: this.rules
      // 提供数据方法二：key：this（直接把当前组件的实例传递下去）
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validataAll () {
      // 获取所有子组件，拿到它们的校验结果，有一项校验不通过则不通过
      return this.$children
        .filter(comp => comp.prop) // 过滤掉没有prop的组件，如包含登录按钮的KFormItem，不需要校验
        .every(comp => comp.validata()) // 全部返还true则返回true，否则返回false
    }
  }
}
</script>

<style scoped>

</style>
