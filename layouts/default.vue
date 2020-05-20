<template>
  <div>
    <nuxt-link to='/'>首页</nuxt-link>
    <!-- no-prefetch 不预加载 -->
    <nuxt-link to='/about' no-prefetch>关于</nuxt-link>
    <nuxt-link to='/detail/123'>详情</nuxt-link>
    <nuxt />
  </div>
</template>

<style>
</style>
