<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/index">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view/>
    <p @click="$store.commit('add')">count: {{$store.state.count}}</p>
    <p @click="$store.dispatch('add')">async count: {{$store.state.count}}</p>
    <p>get count: {{$store.getters.getCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
