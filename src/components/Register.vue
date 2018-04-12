<template>
  <div class="container">
    <div class="box">
      <p class="heading is-size-4 has-text-centered has-text-weight-light">SIGN UP</p>
      <div class="auth-error-box notification is-danger has-text-centered" v-if="error">
        <p class="heading">
          {{error.message}}
        </p>
        <p v-if="error.code === 'auth/email-already-in-use'" class="heading">
          <a @click="toLogin">Click here</a> to log in instead.
        </p>
      </div>

      <form @submit.prevent="register">
        <div class="field">
          <label class="label is-small">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g MarkSmith@gmail.com" v-model.trim="email" :class="{'is-danger': $v.email.$error, 'is-success': !$v.email.$invalid && $v.email.$dirty}" @input="delayTouch($v.email)">
            <p class="help is-danger" v-if="!$v.email.email && $v.email.$dirty">Please enter a valid e-mail address.</p>
          </div>
        </div>

        <div class="field">
          <label class="label is-small">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="Must be between 4 and 16 alphanumeric characters" v-model.trim="password" @input="delayTouch($v.password)" :class="{'is-danger': $v.password.$error, 'is-success': !$v.password.$invalid && $v.password.$dirty }">
            <p class="help is-danger" v-if="$v.password.$dirty && !$v.password.minLength">Password must be at least 4 characters long.</p>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Confirm password</label>
          <div class="control">
            <input class="input" :class="{'is-danger': $v.password2.$error, 'is-success': !$v.password2.$invalid && $v.password2.$dirty}" @input="delayTouch($v.password2)" type="password" placeholder="Repeat your password" v-model.trim="password2">
            <p class="help is-danger" v-if="$v.password2.$dirty && !$v.password2.minLength">Password must be at least 4 characters long.</p>
            <p class="help is-danger" v-if="$v.password2.$dirty && !$v.password2.sameAsPassword">Passwords must be identical.</p>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Username</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. MarkSmith" v-model.trim="username" @input="delayTouch($v.username)" :class="{'is-danger': $v.username.$error || !this.unique && $v.username.$dirty, 'is-success': !$v.username.$invalid && $v.username.$dirty && this.unique}">
            <p class="help is-danger" v-if="$v.username.$dirty && !$v.username.minLength">Username must be at least 3 characters</p>
            <p class="help is-danger" v-if="$v.username.$dirty && !$v.username.alphaNum">Username can only contain letters and numbers.</p>
            <p class="help is-danger" v-if="$v.username.$dirty && !this.unique && username.length > 2">This username is already taken.</p>
            <p class="help is-success" v-if="$v.username.$dirty && this.unique && username.length > 2 && $v.username.alphaNum">This username is available!</p>
          </div>
        </div>
        <div class="field is-grouped form-buttons">
          <p class="control ">
            <button class="button  is-small" type="submit" :disabled="$v.$invalid || !unique">
              SIGN UP
            </button>
          </p>
          <p class="control ">
            <button class="button   is-small " @click="cancel">
              CANCEL
            </button>
          </p>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  email,
  maxLength,
  alphaNum
} from "vuelidate/lib/validators";
import { db } from "../firebase_config";
const touchMap = new WeakMap();
export default {
  name: "Register",
  data() {
    return {
      unique: false,
      email: "",
      password: "",
      password2: "",
      username: ""
    };
  },
  validations: {
    email: {
      email,
      required
    },
    username: {
      required,
      minLength: minLength(3),
      alphaNum
    },
    password: {
      required,
      minLength: minLength(4)
    },
    password2: {
      required,
      minLength: minLength(4),
      sameAsPassword: sameAs("password")
    }
  },
  watch: {
    username(value) {
      if (!this.$v.username.$error) {
        this.checkIfUnique();
      }
    },
    user(value) {
      if (value !== undefined && value !== null) {
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
    checkIfUnique() {
      let uName = this.username.toLowerCase();
      if (this.$v.username.alphaNum) {
        let ref = db.ref("usernames/" + uName);
        ref.on("value", snapshot => {
          snapshot.exists() ? (this.unique = false) : (this.unique = true);
        });
      }
    },

    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 500));
    },

    register() {
      if (!this.$v.$invalid && this.unique === true) {
        this.$store.dispatch("user/REGISTER_USER", {
          email: this.email,
          password: this.password,
          username: this.username
        });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    toLogin() {
      this.$store.dispatch("CLEAR_ERROR");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.wut {
  background-color: #fafafa;
}
.box {
  width: 620px;
  margin: 32px auto;
}

.form-buttons {
  margin-top: 16px;
}

.help {
  padding-left: 4px;
}

.label {
  padding-left: 2px;
}

.auth-error-box {
  margin-top: 16px;
  background-color: #f8f5f5;
  color: #b62626;
  width: 100%;
  border-radius: 1px;
  border-left: 2px solid #b62626;
}

.input {
  font-size: 14px;
}

.label {
  color: #696969;
}
</style>