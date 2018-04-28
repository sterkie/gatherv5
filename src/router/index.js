import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import EventDetail from "../components/event/EventDetail.vue";
import EventCreate from "../components/event/EventCreate.vue";
import FriendProfile from "../components/friend/FriendProfile.vue";
import FriendsList from "../components/friend/FriendsList.vue";
import AuthGuard from "./auth-guard";

import What from "../components/event/new/What.vue";
import Where from "../components/event/new/Where.vue";
import When from "../components/event/new/When.vue";
import Who from "../components/event/new/Who.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, beforeEnter: AuthGuard },
  {
    path: "/events/new",
    redirect: "/events/new/what",
    component: EventCreate,
    beforeEnter: AuthGuard,
    children: [
      {
        path: "what",
        component: What
      },
      {
        path: "where",
        component: Where
      },
      {
        path: "when",
        component: When
      },
      {
        path: "who",
        component: Who
      }
    ]
  },
  { path: "/events/:id", component: EventDetail, beforeEnter: AuthGuard },
  {
    path: "/friends",
    component: FriendsList,
    beforeEnter: AuthGuard,
    children: [
      {
        path: ":username",
        component: FriendProfile,
        props: true,
        beforeEnter: AuthGuard
      }
    ]
  }
];
