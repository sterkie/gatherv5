import { fs } from "../../firebase_config";

const state = {
  newEvent: {
    what: null,
    where: null,
    when: null,
    who: null,
    currentStep: "what",
    dateSet: false
  }
};

const mutations = {
  SET_WHAT: (state, payload) => {
    state.newEvent.what = payload;
  },
  SET_WHERE: (state, payload) => {
    state.newEvent.where = payload;
  },
  SET_WHEN: (state, payload) => {
    state.newEvent.when = payload;
  },
  SET_WHO: (state, payload) => {
    state.newEvent.who = payload;
  },
  SET_CURRENT_STEP: (state, payload) => {
    state.newEvent.currentStep = payload;
  }
};

const actions = {};

const getters = {
  what(state) {
    return state.newEvent.what;
  },
  where(state) {
    return state.newEvent.where;
  },
  when(state) {
    return state.newEvent.when;
  },
  who(state) {
    return state.newEvent.who;
  },
  currentStep(state) {
    return state.newEvent.currentStep;
  },
  dateSet(state) {
    return state.newEvent.dateSet;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
