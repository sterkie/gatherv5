import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import event from "./event";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    event: event
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    CLEAR_ERROR({ commit }) {
      commit("CLEAR_ERROR");
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});
