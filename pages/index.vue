<template>
  <div>
    <h2>商品列表</h2>
    <ul>
      <li v-for="good in goods" :key="good.id" >
        <nuxt-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "课程列表",
      // vue-meta利⽤hid确定要更新meta
      // meta: [{ name: "description", hid: "description", content: "set page meta" }],
      // link: [{ rel: "favicon", href: "favicon.ico" }],
    }
  },
  data() {
    return {
      goods: []
    }
  },
  async asyncData ({ $axios, params, error }) {
    const { code, goods } = (await $axios.get('/api/goods')).data
    if (code === '0') {
      return {goods}  // 返回的数据会和data合并，但是asyncData中的数据由于是异步的，所以会覆盖data，建议给data中的数据一个默认值
    } else {
      // 错误处理
      error({statusCode: 400, message: '数据查询失败请重试~'})
    }
  }
};
</script>