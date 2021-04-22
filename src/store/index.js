import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from '@/axios'
export default new Vuex.Store({
  state: {
    user : null
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    logoutUser(state){
      state.user = null;
    }
  },
  actions: {
    async fetchUser({commit}){
      const {data} = await axios.get('api/users/me');
      commit('setUser',data);
    }
  },
  modules: {
  }
})
