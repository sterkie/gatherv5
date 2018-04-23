<template>
  <div class="side-nav">
    <router-link tag="span" class="icon" to="/dashboard">
      <i class="mdi mdi-home large">
      </i>
    </router-link>
    <span class="icon ">
      <i class="mdi mdi-view-list large">
      </i>
    </span>
    <span class="icon">
      <i class="mdi mdi-calendar large">
      </i>
    </span>
    <span class="icon ">
      <i class="mdi mdi-bookmark large ">
      </i>
    </span>

    <router-link tag="span" class="icon" to="/friends">
      <i class="mdi mdi-account-multiple large">
      </i>
      <transition name="fade">
        <span class="badge" v-if="requests.length > 0" :key="requests.length"></span>
      </transition>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "SideNav",
  computed: {
    requests() {
      return this.$store.getters["friend/requests"];
    }
  }
};
</script>

<style scoped lang="scss">
.side-nav {
  .large {
    font-size: 28px;
  }
  .icon {
    padding: 0px 0px 80px 16px;
    display: block;
    color: #646e80;
    &:hover {
      color: rgb(255, 255, 255);
      cursor: pointer;
    }
  }
  .active {
    color: #ffffffe1;
    // background: #46485a;
  }
  .badge {
    position: relative;
  }
  .badge:after {
    content: "";
    position: absolute;
    top: -40px;
    right: -30px;
    font-weight: 600;
    text-align: center;
    line-height: 23px;
    background: #1395ec;
    color: white;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>