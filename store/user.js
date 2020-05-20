export const state = () => ({
  token: ''
});

export const mutations = {
  init(state, token) {
    state.token = token;
  }
};

export const getters = {
  isLogin(state) {
    return !!state.token;
  }
};

export const actions = {
  login({ commit, getters }, u) {
    // return this.$axios.$post("/api/login", u).then(({ token }) => { // 正常用法
    return this.$login(u).then(({ token }) => {  // 使用api-inject.js中注入的插件$login
      if (token) {
        commit("init", token);
      }
      return getters.isLogin;
    });
  }
};