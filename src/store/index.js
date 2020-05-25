import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    area: ''
  },
  mutations: {
    changeArea(state, area) {
      state.area = area;
    }
  },
  actions: {
  },
  modules: {
  }
});
