<template>
  <div class="container">
    <div class="columns">
      <div class="login-container column is-half is-offset-one-quarter">
        <form @submit.prevent="login" class="login-form">
          <div class="field">
            <label class="label">Hello</label>
            <input type="text">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  watch: {
    user(value) {
      if (value !== undefined && value !== undefined) {
        this.$store.dispatch("CLEAR_ERROR");
        this.$router.push("/dashboard");
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    login() {
      this.$store.dispatch("user/LOGIN_USER", {
        email: this.email,
        password: this.password
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.login-container {
  margin-top: 64px;
  border: 1px solid orange;
}
</style>