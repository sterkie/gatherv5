import { fs } from "../../firebase_config";

const state = {
  friends: [],
  requests: []
};

const mutations = {
  SET_FRIENDS(state, payload) {
    state.friends = payload;
  },

  SET_REQUESTS(state, payload) {
    state.requests = payload;
  },

  ADD_FRIEND(state, payload) {
    state.friends.push(payload);
  }
};

const actions = {
  SET_REQUESTS({ commit }, payload) {
    commit("SET_REQUESTS", payload);
  },

  SET_FRIENDS({ commit }, payload) {
    commit("SET_FRIENDS", payload);
  },

  SEND_FRIEND_REQUEST({ rootGetters }, payload) {
    let user = rootGetters["user/user"];
    let ref = fs
      .collection("users")
      .doc(payload)
      .collection("requests")
      .doc(user.id);
    ref
      .set({
        requester_id: user.id,
        requester_username: user.username,
        requester_displayname: user.displayname,
        requested_at: new Date().getTime()
      })
      .then(console.log("request sent"));
  },

  ACCEPT_FRIEND_REQUEST({ rootGetters }, payload) {
    let user = rootGetters["user/user"];
    let userRef = fs
      .collection("users")
      .doc(user.id)
      .collection("friends")
      .doc(payload.requester_id);
    let requesterRef = fs
      .collection("users")
      .doc(payload.requester_id)
      .collection("friends")
      .doc(user.id);
    let deleteRef1 = fs
      .collection("users")
      .doc(user.id)
      .collection("requests")
      .doc(payload.requester_id);
    let batch = fs.batch();
    batch.set(userRef, {
      friend_id: payload.requester_id,
      friend_username: payload.requester_username,
      friend_displayname: payload.requester_displayname,
      friend_since: new Date().getTime()
    });
    batch.set(requesterRef, {
      friend_id: user.id,
      friend_username: user.username,
      friend_displayname: user.displayname,
      friend_since: new Date().getTime()
    });
    batch.delete(deleteRef1);

    batch.commit().then(console.log("you are now friends"));
  },

  DECLINE_FRIEND_REQUEST({ rootGetters }, payload) {
    console.log(payload);
    let user = rootGetters["user/user"];
    fs
      .collection("users")
      .doc(user.id)
      .collection("requests")
      .doc(payload.requester_id)
      .delete()
      .then(() => {
        console.log("deleted");
      });
  },

  REMOVE_FRIEND({ rootGetters }, payload) {
    let userId = rootGetters["user/user"].id;
    let currentUserRef = fs
      .collection("users")
      .doc(userId)
      .collection("friends")
      .doc(payload);
    let friendRef = fs
      .collection("users")
      .doc(payload)
      .collection("friends")
      .doc(userId);
    let batch = fs.batch();
    batch.delete(currentUserRef);
    batch.delete(friendRef);
    batch.commit().then(console.log("Unfriended ", payload.friend_username));
  }
};

const getters = {
  friends(state) {
    return state.friends;
  },
  requests(state) {
    return state.requests;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
