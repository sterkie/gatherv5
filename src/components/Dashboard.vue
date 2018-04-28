<template>
  <div class="">
    <!-- <div class="page--title">
      hello
    </div> -->
    <div class="columns is-gapless">
      <div class="column is-1">
        hello
      </div>
      <div class="column is-4">

      </div>
      <div class="column is-7">
        hello
      </div>
    </div>
  </div>
</template>

<script>
import { fs } from "../firebase_config";

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    uploadAvatar() {}
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    events() {
      return this.$store.getters["event/events"];
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.page--title {
  background: #1395ec;
  height: 72px;
}
</style>