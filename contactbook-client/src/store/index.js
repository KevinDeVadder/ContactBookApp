import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false
  },
  mutations: {
    switchUserState(){
      this.state.isUserLoggedIn = !this.state.isUserLoggedIn
    }
  },
  actions: {
  },
  modules: {
  }
})
