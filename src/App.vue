<template>
  <div>
    <notifications group="foo" width="200" position="top center" />
    <TheHeader />
    <router-view> </router-view>
  </div>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader
  }
};
</script>