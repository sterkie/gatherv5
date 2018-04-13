<template>
  <div>
    <b-loading :active.sync="loading" :is-full-page="true"></b-loading>
    <div class="container" v-if="!loading">
      <div class="box">
        <div class="content">
          welcome to your dashboard {{user.displayname}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.box {
  min-height: 50%;
}
</style>