import Vue from "vue";
import Router from "vue-router";
import { routes } from "./router";
import { store } from "./store";
import { auth, fs } from "./firebase_config";

import Buefy from "buefy";

import Vuelidate from "vuelidate";

import Notifications from "vue-notification";

// FILTERS
import { monthday, shortdate, longdate, showMonth, ago } from "./filters/date";

// COMPONENTS
import App from "./App.vue";

Vue.use(Router);
Vue.use(Buefy);
Vue.use(Notifications);
Vue.use(Vuelidate);

import "./assets/styles/main.scss";

const router = new Router({
  mode: "history",
  routes: routes,
  linkActiveClass: "active"
});

Vue.filter("monthday", monthday);
Vue.filter("ago", ago);
Vue.filter("shortdate", shortdate);
Vue.filter("longdate", longdate);
Vue.filter("showMonth", showMonth);

Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    el.event = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.event);
  },
  unbind: function(el) {
    document.body.removeEventListener("click", el.event);
  }
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.$store.dispatch("user/PERSIST_LOGIN", user);
        this.$store.dispatch("user/LOAD_USER_DATA");
        // this.$store.dispatch("event/GET_EVENTS");
        let requestRef = fs
          .collection("users")
          .doc(user.uid)
          .collection("requests");
        requestRef.orderBy("requested_at", "desc").onSnapshot(snap => {
          let requests = [];
          snap.forEach(request => {
            requests.push(request.data());
          });
          this.$store.dispatch("friend/SET_REQUESTS", requests);
        });
        fs
          .collection("users")
          .doc(user.uid)
          .collection("friends")
          .orderBy("friend_username")
          .onSnapshot(snap => {
            let friends = [];
            snap.forEach(friend => {
              friends.push(friend.data());
            });
            this.$store.dispatch("friend/SET_FRIENDS", friends);
          });
      }
    });
  }
});
