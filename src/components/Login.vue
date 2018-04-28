<template>
  <div class="container">
    <div class="columns">
      <div class="login-container column is-half is-offset-one-quarter">
        <div class="login-title has-text-centered">
          <span class="is-size-3">SIGN IN</span>
        </div>
        <div class="error-block has-text-centered" v-if="error">
          <div>{{error.message}}</div>
        </div>
        <form @submit.prevent="login" class="login-form">
          <div class="field">
            <label>E-mail</label>
            <input type="text" v-model="email">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" v-model="password">
          </div>
          <button class="button submit">SUBMIT</button>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0;
}
.login-container {
  margin-top: 64px;
  background: $citembg;
  box-shadow: $citemshadow;
  .login-title {
    padding: 16px 64px;
    background: #323443;
    // margin-bottom: 3px;
    letter-spacing: 1rem;
    color: $cheading;
    border-bottom: 2px solid $cdarkborder;
  }
  .error-block {
    padding: 32px 16px;
    background: $cdangerborder;
    color: #cacaca;
    letter-spacing: 1.1px;
  }
  .login-form {
    padding: 32px 64px;
    input {
      background: $cinputbg;
      border: 0;
      padding: 8px;
      width: 100%;
      border-radius: 6px;
      font-size: 16px;
      color: $cheading;
      &:focus {
        outline: none;
        border: 0;
      }
      &::placeholder {
        color: $ctext;
      }
    }
    label {
      color: #637884;
      letter-spacing: 1.2px;
      font-weight: 200;
      display: block;
      text-transform: uppercase;
      margin-bottom: 2px;
      font-size: 14px;
    }
    .submit {
      margin-top: 16px;
      width: 100%;
      background-color: $cprimary;
      color: white;
      border: 0;
    }
  }
}
</style>