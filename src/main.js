import Vue from "vue";
import Router from "vue-router";
import { routes } from "./router";
import { store } from "./store";
import { auth } from "./firebase_config";

import Buefy from "buefy";

import Vuelidate from "vuelidate";

import Notifications from "vue-notification";

// FILTERS
import { monthday, shortdate, showMonth } from "./filters/date";

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
  linkActiveClass: "is-active"
});

import lodash from "lodash";
Object.defineProperty(Vue.prototype, "$lodash", { value: lodash });

Vue.filter("monthday", monthday);
Vue.filter("shortdate", shortdate);
Vue.filter("showMonth", showMonth);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("user/PERSIST_LOGIN", user);
        this.$store.dispatch("user/LOAD_USER_DATA");
        this.$store.dispatch("event/GET_EVENTS");
      }
    });
  }
});
