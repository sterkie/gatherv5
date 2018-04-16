import { fs } from "../../firebase_config";

const state = {
  events: []
};

const mutations = {
  SET_EVENTS(state, payload) {
    state.events = payload;
  },

  ADD_EVENT(state, payload) {
    state.events.push(payload);
  }
};

const actions = {
  ADD_EVENT({ commit, rootGetters }, payload) {
    commit("SET_LOADING", true, { root: true });
    // Get new event_id and store it for later
    let newEventRef = fs.collection("events").doc();
    // Add creator to event participants , set is_creator to true and pa_status to 'coming'
    let creatorObj = {
      user_id: rootGetters["user/user"].id,
      displayname: rootGetters["user/user"].displayname,
      is_creator: true,
      pa_status: "coming"
    };
    // Compose the new event object
    let newEventObj = {
      event_id: newEventRef.id,
      title: payload.title,
      location: payload.location,
      suggestedDates: payload.suggestedDates,
      createdAt: new Date(),
      creator_id: rootGetters["user/user"].id,
      creator_displayname: rootGetters["user/user"].displayname,
      event_status: payload.event_status,
      date: payload.date,
      participants: {
        [rootGetters["user/user"].id]: {
          ...creatorObj
        }
      }
    };
    // Write to firebase
    newEventRef
      .set(newEventObj)
      .then(() => {
        commit("ADD_EVENT", newEventObj);
        commit("SET_LOADING", false, { root: true });
      })
      .catch(e => {
        commit("SET_ERROR", e, { root: true });
        console.log("error", e);
        commit("SET_LOADING", false, { root: true });
      });
  },

  GET_EVENTS({ commit, rootGetters }) {
    commit("SET_LOADING", true, { root: true });
    let userId = rootGetters["user/user"].id;
    let events = [];
    fs
      .collection("events")
      .orderBy(`participants.${userId}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          events.push(doc.data());
        });
        commit("SET_EVENTS", events);
        commit("SET_LOADING", false, { root: true });
      });
  }
};

const getters = {
  events(state) {
    return state.events;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
