<template>
    <div class="container" v-if="!loading">
        <div v-if="error">{{ error.message }}</div>
        <div v-if="selectedUser">
            user profile for {{selectedUser.displayname}}
        </div>
    </div>
</template>

<script>
export default {
  props: ["username"],
  name: "UserProfile",
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      let lc = this.username.toLowerCase();
      this.$store.dispatch("user/GET_PROFILE", lc);
    }
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

<style scoped>

</style>