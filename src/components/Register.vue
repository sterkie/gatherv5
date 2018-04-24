<template>
  <div class="container">
    <div class="columns">
      <div class="register-container column is-half is-offset-one-quarter">
        <div class="register-title has-text-centered">
          <span class="is-size-3">CREATE ACCOUNT</span>
        </div>
        <div v-if="error" class="error-block has-text-centered">
          <p>
            {{error.message}}
          </p>
          <p v-if="error.code === 'auth/email-already-in-use'">
            <a @click="toLogin">Click here</a> to log in instead.
          </p>
        </div>
        <form @submit.prevent="register" class="register-form">
          <div class="field">
            <label>Email</label>
            <input type="email" v-model.trim="email" :class="{'is-danger': $v.email.$error, 'is-success': !$v.email.$invalid && $v.email.$dirty}" @input="delayTouch($v.email)">
            <p class="error-message" v-if="!$v.email.email && $v.email.$dirty">Please enter a valid e-mail address.</p>
          </div>

          <div class="field">
            <label>Password</label>
            <input type="password" v-model.trim="password" @input="delayTouch($v.password)" :class="{'is-danger': $v.password.$error, 'is-success': !$v.password.$invalid && $v.password.$dirty }">
            <p class="error-message" v-if="$v.password.$dirty && !$v.password.minLength">Password must be at least 4 characters long.</p>
          </div>

          <div class="field">
            <label>Confirm password</label>
            <input :class="{'is-danger': $v.password2.$error, 'is-success': !$v.password2.$invalid && $v.password2.$dirty}" @input="delayTouch($v.password2)" type="password" v-model.trim="password2">
            <p class="error-message" v-if="$v.password2.$dirty && !$v.password2.minLength">Password must be at least 4 characters long.</p>
            <p class="error-message" v-if="$v.password2.$dirty && !$v.password2.sameAsPassword">Passwords must be identical.</p>
          </div>

          <div class="field">
            <label>Username</label>
            <div :class="{'is-loading': loading}">
              <input type="text" v-model.trim="username" @input="delayTouch($v.username)" :class="{'is-danger': $v.username.$error && !loading || !this.unique && $v.username.$dirty && !loading, 'is-success': !$v.username.$invalid && $v.username.$dirty && this.unique && !loading}">
              <div v-if="loading">
                <p class="help" v-if="$v.username.$dirty">Checking...</p>
              </div>
              <transition name="fade" mode="out-in">
                <div v-if="!loading">
                  <p class="error-message" v-if="$v.username.$dirty && !$v.username.minLength">Username must be at least 3 characters</p>
                  <p class="error-message" v-if="$v.username.$dirty && !$v.username.alphaNum">Username can only contain letters and numbers.</p>
                  <p class="error-message" v-if="$v.username.$dirty && !this.unique && username.length > 2">This username is already taken.</p>
                  <p class="success-message" v-if="$v.username.$dirty && this.unique && username.length > 2 && $v.username.alphaNum">This username is available!</p>
                </div>
              </transition>
            </div>
          </div>

          <button class="button submit" type="submit" :disabled="$v.$invalid || !unique">
            CREATE ACCOUNT
          </button>

        </form>
      </div>
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
import { fs } from "../firebase_config";
import debounce from "lodash/debounce";
const touchMap = new WeakMap();
export default {
  name: "Register",
  data() {
    return {
      unique: true,
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
      if (!this.$v.username.$error & (value.length > 2)) {
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
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    checkIfUnique: debounce(function() {
      this.$store.commit("SET_LOADING", true, { root: true });
      let uName = this.username.toLowerCase();
      if (this.$v.username.alphaNum && uName.length > 2) {
        let ref = fs.collection("users").where("username", "==", uName);
        let check = ref.get().then(doc => {
          doc.empty ? (this.unique = true) : (this.unique = false);
          this.$store.commit("SET_LOADING", false, { root: true });
        });
      } else {
        this.$store.commit("SET_LOADING", false, { root: true });
      }
    }, 400),

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
    // cancel() {
    //   this.$router.go(-1);
    // },
    toLogin() {
      this.$store.dispatch("CLEAR_ERROR");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0;
}
.register-container {
  margin-top: 64px;
  background: $citembg;
  box-shadow: $citemshadow;
  .register-title {
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

  .error-message {
    margin-top: 6px;
    padding: 8px;
    background: $cdangerborder;
    color: #cacaca;
    letter-spacing: 1.1px;
  }
  .success-message {
    margin-top: 8px;
    padding: 6px;
    color: white;
    background: $csuccessborder;
    // border: 1px solid #39946c;
    outline: none;
  }
  .register-form {
    padding: 32px 64px;
    input {
      background: $cinputbg;
      border: 0;
      padding: 8px;
      width: 100%;
      border-radius: 2%;
      font-size: 16px;
      color: $cheading;
      &:focus {
        outline: none;
        border: 0;
      }
      &::placeholder {
        color: $ctext;
        font-size: 14px;
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
    .help {
      letter-spacing: 1.1px;
      font-size: 12px;
      padding-left: 4px;
    }
    .submit {
      width: 50%;
      background-color: $cprimary;
      color: white;
      border: 0;
    }
    .is-grouped {
      margin-top: 32px;
    }
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