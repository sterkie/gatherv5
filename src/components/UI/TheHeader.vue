<template>
    <div class="navbar" style="background-color: #f0f0f0">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="app-title title has-text-weight-light">GATHER
                    <small class="beta is-size-6">beta</small>
                </router-link>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <router-link to="/dashboard" class="navbar-item" v-if="isAuthenticated">Dashboard</router-link>
                    <router-link to="/login" class="navbar-item" v-if="!isAuthenticated">Login</router-link>
                    <router-link to="/register" class="navbar-item" v-if="!isAuthenticated">Register</router-link>
                    <a @click="logOut" class="navbar-item" v-if="isAuthenticated"> Logout </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    isAuthenticated() {
      return this.user !== undefined && this.user !== null ? true : false;
    },
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("user/LOGOUT_USER");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  padding-left: 14px;
  padding-top: 7px;
}
</style>