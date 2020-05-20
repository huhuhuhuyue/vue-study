<template>
  <div>
    <p>
      <label for="">用户名：</label>
      <input v-model="username" type="text" placeholder="用户名">
    </p>
    <p>
      <label for="">密码：</label>
      <input v-model="password" type="password" placeholder="密码">
    </p>
    <p>
      <button @click="login">登录</button>
    </p>
  </div>
</template>

<script>
  export default {
    layout: 'blank',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        // user/login找的是store/user下的login方法
        this.$store.dispatch("user/login", {username: this.username, password: this.password}).then(res => {
          // 登录成功重定向
          if (res) {
            const redirect = this.$route.query.redirect || "/";
            this.$router.push(redirect);
          }
        });
      }
    } 
  }
</script>

<style scoped>

</style>