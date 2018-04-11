import { auth, db } from "../../firebase_config";

const state = {
  user: null
};

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  }
};

const actions = {
  REGISTER_USER: ({ commit }, payload) => {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        db
          .ref("users/")
          .child(user.uid)
          .set({ id: user.uid, username: payload.username });
        db
          .ref("usernames")
          .child(payload.username)
          .set(user.uid)
          .then(
            commit("SET_USER", {
              id: user.uid,
              username: payload.username,
              registeredEvents: {}
            })
          );
      });
  },

  LOGIN_USER: ({ commit }, payload) => {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("SET_USER", { id: user.uid });
        console.log("logged in", payload);
      });
  },

  LOGOUT_USER: ({ commit }) => {
    auth.signOut().then(commit("SET_USER", null));
  },

  PERSIST_LOGIN: ({ commit }, payload) => {
    let tempUser = {
      id: payload.uid
    };
    commit("SET_USER", tempUser);
    console.log("persisted login", tempUser);
  },

  LOAD_USER_DATA: ({ getters, commit }) => {
    let userId = getters.user.id;
    let userObj = {};
    db.ref("users/" + userId).once("value", snapshot => {
      let registeredEvents = {};
      if (snapshot.hasChild("registeredEvents")) {
        registeredEvents = snapshot.val().registeredEvents;
      }
      userObj.id = userId;
      userObj.username = snapshot.val().username;
      userObj.registeredEvents = registeredEvents;
      console.log("loaded user data", userObj);
      commit("SET_USER", userObj);
    });
  }
};

const getters = {
  user(state) {
    return state.user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
