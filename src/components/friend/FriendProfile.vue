<template>
  <div class="profile-container">
    <div class="profile-header">
      <h3 class="profile-title">
        FRIEND PROFILE
      </h3>
      <div>
        <div class="button remove-friend-button" @click="removeFriend(selectedUser.id)">Remove</div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="info-box" v-if="selectedUser" :key="selectedUser.id">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <div>
                <p class="profile-heading">
                  Username
                </p>
                <p class="profile-subheading">
                  {{selectedUser.displayname}}
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["username"],
  name: "UserProfile",
  beforeMount() {
    this.getProfile();
  },

  methods: {
    getProfile() {
      this.$store.dispatch("user/GET_PROFILE", this.username);
    },
    removeFriend(friendId) {
      this.$store.dispatch("friend/REMOVE_FRIEND", friendId);
      this.$router.push("/friends");
    }
  },
  watch: {
    $route: "getProfile"
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    selectedUser() {
      return this.$store.getters["user/selectedUser"];
    }
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  border: 1px solid orange;
  padding: 18px;
  .profile-header {
    display: flex;

    justify-content: space-between;
    font-weight: 200;
    text-transform: uppercase;
    background: transparent;
    margin-bottom: 1.5rem;
    .profile-title {
      color: #596477;
      font-size: 1.5rem;
    }
    span {
      color: #6eb3d6;
      font-size: 1.6rem;
    }
  }
  .info-box {
    background: transparent;
    color: #55626691;
    padding-left: 16px;
    border-left: 2px solid #43afd2;
    margin-top: 16px;
  }
  .profile-heading {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 18px;
    color: #6f808a;
    letter-spacing: 1.1px;
  }
  .profile-subheading {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1.2px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>