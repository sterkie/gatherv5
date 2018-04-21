import { fs } from "../../firebase_config";

const state = {
  notifications: null
};

const mutations = {
  SET_NOTIFICATIONS(state, payload) {
    state.notifications = payload;
  },

  ADD_NOTIFICATION(state, payload) {
    console.log("added notification");
  }
};

const actions = {
  SET_USER_NOTIFICATIONS: ({ commit }, payload) => {
    commit("SET_NOTIFICATIONS", payload);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
