import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard }
];
