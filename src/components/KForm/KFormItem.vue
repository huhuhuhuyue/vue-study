<template>
  <div>
    <!-- label -->
    <label v-if="label" for="">{{label}}</label>
    <!-- input插槽 -->
    <slot></slot>
    <!-- 错误信息 -->
    <p class="error">{{error}}</p>
    <p>{{form.rules[prop]}}</p>
  </div>
</template>

<script>
export default {
  name: 'kFormItem',
  inject: ['form'], // 可以用数组接收
  // inject: {
  //   formData: 'from' // 重命名为formData
  // },
  // inject: {
  //   formData: {  // 注入的数据为formDa
  //     from: 'form',  // 来源是form
  //     default: {}  // 默认值是{}
  //   }
  // },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    this.$on('validata', () => {
      this.validata()
    })
  },
  methods: {
    validata () {
      // 获取值和校验规则
      // 执行校验
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      if (value === '' && rules[0].required) {
        this.error = rules[0].message
        return false
      } else {
        this.error = ''
        return true
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
