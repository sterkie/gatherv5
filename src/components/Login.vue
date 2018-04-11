<template>
  <div class="container">
    <div class="box">
      <form @submit.prevent="login">
        <b-field class="has-text-centered">
          <h3 class="has-text-weight-light is-size-5">LOGIN</h3>
        </b-field>
        <b-field label="Email" class="" custom-class="is-small">
          <b-input type="email" placeholder="Enter your email ... " v-model="email">
          </b-input>
        </b-field>
        <b-field label="Password" class="" custom-class="is-small">
          <b-input type="password" placeholder="Enter your password..." v-model="password" password-reveal>
          </b-input>
        </b-field>
        <b-field class="form-buttons" grouped>
          <p class="control ">
            <button class="button is-success is-outlined" type="submit ">
              LOGIN
            </button>
          </p>
          <p class="control ">
            <button class="button is-info is-outlined " @click="cancel ">
              CANCEL
            </button>
          </p>
        </b-field>
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
        this.$notify({
          group: "foo",
          type: "success",
          title: "Succes.",
          text: "Successfully logged in."
        });
        this.$router.push("/dashboard");
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
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
.box {
  width: 540px;
  margin: 32px auto;
}

.form-buttons {
  margin-top: 32px;
}
</style>