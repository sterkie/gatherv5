import { auth, fs } from "../../firebase_config";

const state = {
  user: null,
  selectedUser: null
};

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SELECTED_USER: (state, payload) => {
    state.selectedUser = payload;
  }
};

const actions = {
  REGISTER_USER: ({ commit }, payload) => {
    commit("SET_LOADING", false, { root: true });
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        fs
          .collection("users")
          .doc(user.uid)
          .set({
            id: user.uid,
            username: payload.username.toLowerCase(),
            displayname: payload.username
          })
          .then(
            commit("SET_USER", {
              id: user.uid,
              username: payload.username.toLowerCase(),
              displayname: payload.username
            })
          );
      })
      .catch(e => {
        commit("SET_ERROR", e, {
          root: true
        });
        commit("SET_LOADING", false, { root: true });
      });
  },

  LOGIN_USER: ({ commit }, payload) => {
    commit("SET_LOADING", true, { root: true });
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("SET_USER", { id: user.uid });
      })
      .catch(e => {
        commit("SET_ERROR", e, { root: true });
        commit("SET_LOADING", false, { root: true });
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
  },

  LOAD_USER_DATA: ({ getters, commit }) => {
    // IMPLEMENT FETCHING OF EVENTS
    commit("SET_LOADING", true, { root: true });
    let userId = getters.user.id;
    let userObj = {};
    fs
      .collection("users")
      .doc(userId)
      .get()
      .then(doc => {
        userObj.id = userId;
        userObj.username = doc.data().username;
        userObj.displayname = doc.data().displayname;
        commit("SET_USER", userObj);
        commit("SET_LOADING", false, { root: true });
      });
  },

  GET_PROFILE({ commit }, payload) {
    commit("SET_LOADING", true, { root: true });
    fs
      .collection("users")
      .where("username", "==", payload)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          commit(
            "SET_ERROR",
            { message: "User could not be found" },
            { root: true }
          );
          commit("SET_LOADING", false, { root: true });
        } else {
          querySnapshot.forEach(doc => {
            commit("SELECTED_USER", doc.data());
            commit("SET_LOADING", false, { root: true });
          });
        }
      })
      .catch(e => {
        commit("SET_ERROR", e, { root: true });
        commit("SET_LOADING", false, { root: true });
      });
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  selectedUser(state) {
    return state.selectedUser;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
