<template>
  <div class="navbar is-transparant is-medium">
    <div class="navbar-brand has-text-weight-bold" style="align-items: center">
      G A T H E R
      <small class="beta has-text-primary is-size-7">beta</small>
    </div>
    <div class="navbar-end">
      <router-link to="/login" class="navbar-item" v-if="!isAuthenticated">SIGN IN</router-link>
      <router-link to="/register" class="navbar-item" v-if="!isAuthenticated">CREATE ACCOUNT</router-link>

      <div class="navbar-item" v-if="isAuthenticated">
        <button class="button is-rounded create-event-button">
          New event
          <span class="icon is-small">
            <i class="mdi mdi-plus header-icon"></i>
          </span>
        </button>
      </div>
      <div class="navbar-item" v-if="isAuthenticated">
        <span class="icon">
          <i class="mdi mdi-magnify header-icon"></i>
        </span>
      </div>
      <div class="navbar-item" v-if="isAuthenticated">
        <span class="icon">
          <i class="mdi mdi-bell-outline header-icon"></i>
        </span>
      </div>

      <transition name="fade">
        <div class="navbar-item has-dropdown" :class="{'is-active': dropdownActive}" v-click-outside="close" v-if="isAuthenticated">
          <div class="navbar-link" @click="dropdownActive = !dropdownActive">
            <img src="http://i.pravatar.cc/400" class="avatar">
          </div>
          <div class="navbar-dropdown is-right">
            <p class="navbar-item">
              Logged in as
              <span v-if="user && user.displayname"> {{user.displayname}}</span>
            </p>
            <div class="navbar-divider"></div>
            <a class="navbar-item" href="/settings">
              <span class="icon">
                <i class="mdi mdi-settings dropdown-icon"></i>
              </span>
              <span>Settings</span>
            </a>
            <a class="navbar-item" @click="logOut">
              <span class="icon">
                <i class="mdi mdi-logout-variant dropdown-icon"></i>
              </span>
              <span>Log out</span>
            </a>

          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownActive: false
    };
  },
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
      this.$store.dispatch("user/LOGOUT_USER").then(this.$router.push("/"));
    },
    close() {
      this.dropdownActive = false;
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  color: #ffff;
  border-top: 2px solid lightblue;
  background: #333544;
}
.navbar-brand {
  margin-left: 22px;
  font-size: 24px;
  letter-spacing: 0.3rem;
  font-family: "Lato";
  color: #d5e4e8;
}

.navbar-end {
  margin-right: 16px;
}

.navbar-item {
  color: #ffff;
}

.beta {
  padding-top: 11px;
  padding-left: 6px;
}

.avatar {
  border-radius: 50%;
  width: 36px;
  min-height: 36px;
}

.create-event-button {
  border: 2px solid #43afd2;
  background: #333544;
  color: #80b3c3;
  font-size: 14px;
  font-weight: 400;
  padding-top: 6px;
  padding-bottom: 26px;
  padding-left: 16px;
  padding-right: 0px;
  &:hover {
    background-color: darken(#43afd2, 35%);
    color: lighten(#80b3c3, 20%);
  }
}

button span {
  padding-left: 24px;
  color: #3e51c9;
  padding-right: 28px;
  font-size: 12px;
}

.header-icon {
  font-size: 24px;
  color: white;
}
.dropdown-icon {
  font-size: 18px;
  color: white;
  padding-right: 12px;
}

.mdi-chevron-down {
  font-size: 22px;
  padding-left: 8px;
}

.navbar-dropdown {
  margin-top: 2px;
  border: 1px solid #333544;
  width: 264px;
}

.navbar-divider {
  background-color: #5278a2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>