<template>
  <div>
    <b-loading :active.sync="loading" :is-full-page="true"></b-loading>
    <TheHeader class="header" />
    <router-view> </router-view>
  </div>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
.header {
  margin-bottom: 8px;
}
</style>
