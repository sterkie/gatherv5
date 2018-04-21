<template>
  <div class="container">
    <div class="box">
      <p class="heading is-size-4 has-text-centered has-text-weight-light">SIGN IN</p>
      <div class="login-error-box notification is-danger" v-if="error">
        <div class="heading is-clearfix">
          <!-- <span class="icon has-text-danger is-pulled-left">
            <i class="mdi mdi-alert-decagram mdi-24px"></i>
          </span> -->
          <p class="has-text-centered login-error-message">
            {{error.message}}
          </p>
        </div>
        <!-- <p v-if="error.code === 'auth/email-already-in-use'" class="heading">
          <a @click="toLogin">Click here</a> to log in instead.
        </p> -->
      </div>
      <form @submit.prevent="login">
        <div class="field">
          <label class="label is-small">Email</label>
          <div class="control">
            <input class="input" type="email" v-model.trim="email">
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Password</label>
          <div class="control">
            <input class="input" type="password" v-model.trim="password">
          </div>
        </div>
        <div class="field is-grouped form-buttons">
          <p class="control ">
            <button class="button is-small" type="submit">
              LOG IN
            </button>
          </p>
          <p class="control ">
            <button class="button is-small " @click="cancel">
              CANCEL
            </button>
          </p>
        </div>
      </form>
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

</style>