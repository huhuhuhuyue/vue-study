// 参数1上下文
// 参数2注入函数
export default ({ $axios }, inject) => {
  // 将来在nuxt的上下文中会有this.$login属性，值就是后面的函数
  inject("login", user => {
    return $axios.$post("/api/login", user);
  });
};