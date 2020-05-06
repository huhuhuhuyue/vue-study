<template>
  <div>
    我是孙子组件
    <!-- <p>孙子组件接收到foo：{{foo}}</p>
    <p>孙子组件接收到bar：{{bar}}</p> -->
    <!-- 重命名后要使用新的名称来访问属性 -->
    <p>我的父组件提供的obj.name：{{getObj.name}}</p>
  </div>
</template>
<script>
export default {
  // props: {
  //   toChild: {
  //     type: String,
  //     default: ''
  //   }
  // },
  // inject: ['foo', 'obj'],  // inject可以是数组或对象
  inject: {
    foo: {
      default: '自己的foo'
    },
    bar: {
      default: '自己的bar'
    },
    getObj: {
      from: 'obj',
      default: {}
    }
  },
  created () {
    // console.log('孙子组件', this.$attrs)
  },
  mounted () {
    this.$emit('testListeners2')
  }
}
</script>
