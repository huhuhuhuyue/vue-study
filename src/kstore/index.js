import Vue from 'vue'
import Vuex from './kvuex'
// import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions: {
    add ({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  getters: {
    getCount: state => { return state.count }
  },
  modules: {}
})

export default store
