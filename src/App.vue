<template>
  <div>
    <b-loading :active.sync="loading" :is-full-page="true"></b-loading>
    <TheHeader class="header" />
    <div class="columns is-gapless pa">
      <div class="column is-narrow is-hidden-mobile" v-if="user">
        <SideNav class="sideNav has-background-grey" />
      </div>
      <div class="column pa">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { fs } from "./firebase_config";
import TheHeader from "./components/UI/TheHeader.vue";
import SideNav from "./components/UI/SideNav.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    SideNav
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters["user/user"];
    }
  },
  created() {}
};
</script>

<style>
.header {
  border-bottom: 1px solid #2c2d33;
}
.sideNav {
  width: 64px;
  background: #333544;
  min-height: 100vh;
  padding-top: 14px;
  border-right: 1px solid #2c2d33;
}
</style>
