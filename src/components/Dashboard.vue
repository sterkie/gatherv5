<template>
  <div class="container">
    <div class="box">
      welcome to your dashboard {{user ? user.username : '...'}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  }
};
</script>

<style scoped>

</style>