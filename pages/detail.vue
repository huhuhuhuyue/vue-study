<template>
  <div class="container">
    <p>detail page</p>

    <!-- nuxt-child 表示组件的嵌套关系 -->
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "课程详情",
    }
  },
}
</script>

<style>
</style>
