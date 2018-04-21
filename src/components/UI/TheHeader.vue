<template>
  <div class="navbar is-transparant is-medium">
    <div class="navbar-brand has-text-weight-bold" style="align-items: center">
      G A T H E R
      <small class="beta has-text-primary is-size-7">beta</small>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <button class="button is-rounded create-event-button">
          New event
          <span class="icon is-small">
            <i class="mdi mdi-plus header-icon"></i>
          </span>
        </button>
      </div>
      <div class="navbar-item">
        <span class="icon">
          <i class="mdi mdi-magnify header-icon"></i>
        </span>
      </div>
      <div class="navbar-item">
        <span class="icon">
          <i class="mdi mdi-bell-outline header-icon"></i>
        </span>
      </div>

      <div class="navbar-item has-dropdown" :class="{'is-active': dropdownActive}">
        <div class="navbar-link" @click="dropdownActive = !dropdownActive">
          <img src="http://i.pravatar.cc/400" class="avatar">
        </div>
        <div class="navbar-dropdown is-right is-boxed">
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
          <div class="navbar-divider"></div>
          <div class="navbar-item">
            <span class="icon">
              <i class="fa fa-refresh"></i>
            </span>
            <span>Last synced at 14:32:08 on 25 Sep 17</span>
          </div>
        </div>
      </div>

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
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  color: #ffff;
  background: #333544;
}
.navbar-brand {
  margin-left: 22px;
  font-size: 24px;
  letter-spacing: 0.2rem;
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
  font-size: 22px;
  color: white;
  padding-right: 12px;
}

.mdi-chevron-down {
  font-size: 22px;
  padding-left: 8px;
}

.dropdown-menu {
  padding-top: 32px;
  padding-right: 44px;
}
</style>