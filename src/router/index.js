import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import EventDetail from "../components/event/EventDetail.vue";
import EventCreate from "../components/event/EventCreate.vue";
import UserProfile from "../components/user/UserProfile.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/events/new", component: EventCreate },
  { path: "/events/:id", component: EventDetail },
  { path: "/users/:username", component: UserProfile, props: true }
];
