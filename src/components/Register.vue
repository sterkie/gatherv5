<template>

    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-form style="width: 540px">
                <v-text-field label="Username" v-model="username" :counter="16" required></v-text-field>
                <p v-if="!unique && username.length > 3" class="red--text">{{username}} is not available</p>
                <v-text-field label="E-mail" v-model="email" required></v-text-field>
                <v-text-field type="password" label="Password" v-model="password " required></v-text-field>
                <v-btn @click="register">
                    Register
                </v-btn>
                <v-btn @click="cancel">Cancel</v-btn>
            </v-form>
        </v-layout>
    </v-container>

</template>

<script>
import { db } from "../firebase_config";
export default {
  name: "Register",
  data() {
    return {
      unique: false,
      email: "",
      password: "",
      username: ""
    };
  },
  watch: {
    username(value) {
      if (value.length > 3) {
        this.checkIfUnique(value);
      }
    },
    user(value) {
      if (value !== undefined && value !== null) {
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
    checkIfUnique(username) {
      let uName = username.toLowerCase();
      let ref = db.ref("usernames/" + uName);
      ref.on("value", snapshot => {
        snapshot.exists() ? (this.unique = false) : (this.unique = true);
      });
    },

    register() {
      if (this.unique === true) {
        this.$store.dispatch("user/REGISTER_USER", {
          email: this.email,
          password: this.password,
          username: this.username
        });
      } else {
        console.log("username is not unique");
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.wut {
  background-color: #fafafa;
}
</style>