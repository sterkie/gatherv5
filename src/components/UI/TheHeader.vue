<template>
  <div class="navbar" style="background-color: #f0f0f0">
    <div class="container nav-container">
      <div class="navbar-brand">
        <router-link to="/" class="app-title title has-text-weight-light has-text-primary">GATHER
          <small class="beta is-size-6 has-text-dark">beta</small>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/login" class="navbar-item" v-if="!isAuthenticated">Sign in</router-link>
          <router-link to="/register" class="navbar-item" v-if="!isAuthenticated">Create account</router-link>
          <!-- <router-link to="/events/new" class="navbar-item" v-if="isAuthenticated">
            <b-icon icon="plus-box" custom-size="mdi-18px"></b-icon>
            <span class="icon-padding">Create a new event</span>
          </router-link> -->

          <!-- <router-link to="/dashboard" class="navbar-item" v-if="isAuthenticated">Dashboard</router-link> -->
          <b-dropdown position="is-bottom-left" v-if="isAuthenticated" hoverable>

            <a class="navbar-item" slot="trigger">
              <figure class="avatar">
                <p class="image is-32x32 ">
                  <img src="http://i.pravatar.cc/32" class="avatar">
                </p>
              </figure>
              <span>{{user ? user.displayname : ''}}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>

            <b-dropdown-item has-link>
              <router-link to="/dashboard">
                <b-icon icon="home" custom-size="mdi-18px"></b-icon>
                Dashboard
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item value="home" has-link>
              <router-link to="/events/new">
                <b-icon icon="calendar-plus" custom-size="mdi-18px"></b-icon>
                Create an event
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item value="Friends" disabled>
              <b-icon icon="account-multiple-outline" custom-size="mdi-18px"></b-icon>
              Friends
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item value="settings" disabled>
              <b-icon icon="settings" custom-size="mdi-18px"></b-icon>
              Settings
            </b-dropdown-item>
            <b-dropdown-item @click="logOut">
              <b-icon icon="logout" custom-size="mdi-18px"></b-icon>
              Logout
            </b-dropdown-item>
          </b-dropdown>
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
  padding-left: 16px;
  padding-top: 7px;
}

.nav-container {
  padding: 8px 0px;
}

.icon-padding {
  padding-left: 4px;
}

.avatar {
  padding-right: 6px;
  border-radius: 50%;
}
</style>