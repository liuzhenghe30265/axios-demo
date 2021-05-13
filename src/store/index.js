import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的 ajax 请求
    allRequestsRecord: []
  },
  mutations: {
    setAllRequestsRecord(state, data) {
      state.allRequestsRecord = data
    }
  },
  actions: {
  },
  modules: {
  }
})
