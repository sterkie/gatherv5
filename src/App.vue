<template>
  <div id="app" class="has-navbar-fixed-bottom">
    <b-loading :active.sync="loading" :is-full-page="true"></b-loading>
    <TheHeader class="header" />
    <!-- <div class="container"> -->

    <div class="columns">
      <div class="column is-narrow is-hidden-mobile">
        <SideNav class="sideNav" />
      </div>
      <div class="column">
        <transition name="fade" mode="out-in">
          <router-view> </router-view>
        </transition>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
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
#content {
  flex: 1;
  min-height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  border-bottom: 1px solid #2c2d33;
}
.sideNav {
  width: 64px;
  background: #333544;
  height: 100vh;
  padding-top: 14px;
  border-right: 1px solid #2c2d33;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
