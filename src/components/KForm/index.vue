<template>
  <div>
    <k-input v-model="value" type='text' placeholder="hehe"/>
    <!-- kForm, KInput, KFormItem为封装好的组件，在index.vue中使用 -->
    <k-form :model="model" :rules="rules" ref="form">
      <k-form-item label='用户名' prop='username'>
        <!-- 双向绑定的实现 -->
        <!-- <k-input :value='model.username' @valueChanged='getValue' placeholder="请输入用户名"/> -->
        <k-input v-model="model.username" type='text' placeholder="请输入用户名"/>
      </k-form-item>
      <k-form-item label='密码' prop='password'>
        <k-input v-model='model.password' type='password' placeholder="请输入密码"/>
      </k-form-item>
      <k-form-item>
        <button @click="login">登录</button>
      </k-form-item>
    </k-form>
    <span>用户名: {{model.username}}，密码：{{model.password}}</span>
    <span>hehe：{{value}}</span>
  </div>
</template>

<script>
import kForm from './KForm'
import KInput from './KInput'
import KFormItem from './KFormItem'
export default {
  name: 'index',
  components: {
    kForm, KInput, KFormItem
  },
  data () {
    return {
      value: '111',
      model: {
        username: 'cc',
        password: ''
      },
      rules: {
        username: [{required: true, message: '用户名必填'}],
        password: [{required: true, message: '密码必填'}]
      }
    }
  },
  methods: {
    getValue (val) {
      this.value = val
    },
    login () {
      // 点击登录时候看k-form里面的每一项是否都校验通过
      const validataAllRes = this.$refs.form.validataAll() // 通过$refs.form获取form的方法
      if (validataAllRes) {
        alert('校验通过')
      } else {
        alert('校验未通过')
      }
    }
  }
}
</script>

<style scoped>

</style>
