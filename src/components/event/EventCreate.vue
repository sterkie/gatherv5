<template>
  <div>
    <div class="steps-container">
      <div class="columns is-gapless has-text-centered is-mobile">
        <div class="column is-one-quarter" v-for="(step, index) in steps" :key="index">
          <div class="step" :class="[step.toLowerCase() === currentStep ? 'active-step' : '', index === 3 ? 'last' : '']">
            <div class="step-title">
              {{step}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="fade" mode="out-in">
        <div>
          <router-view></router-view>
        </div>
      </transition>
      <nav class="navbar is-fixed-bottom is-transparent is-hidden-mobile" id="stepper">
        <div class="container">
          <div class="navbar-start">
            <div class="step-buttons">
              <button class="button back" @click="prevStep">
                PREVIOUS STEP</button>
            </div>
          </div>
          <div class="step-buttons">
            <button class="button forward" @click="nextStep">
              NEXT STEP
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
export default {
  name: "EventCreate",
  components: {},
  data() {
    return {
      steps: ["What", "Where", "When", "Who"]
    };
  },
  mounted() {
    this.$store.commit("event/SET_CURRENT_STEP", "what");
  },
  methods: {
    nextStep() {
      let next = this.getNextStep();
      if (next !== "none") {
        this.$router.push(`${next}`);
        this.$store.commit("event/SET_CURRENT_STEP", next);
      }
    },
    prevStep() {
      let prev = this.getPrevStep();
      if (prev !== "none") {
        this.$router.push(`${prev}`);
        this.$store.commit("event/SET_CURRENT_STEP", prev);
      }
    },
    getNextStep() {
      switch (this.currentStep) {
        case "what":
          return "where";

        case "where":
          return "when";

        case "when":
          return "who";

        case "who":
          return "none";
      }
    },
    getPrevStep() {
      switch (this.currentStep) {
        case "what":
          return "none";

        case "where":
          return "what";

        case "when":
          return "where";

        case "who":
          return "when";
      }
    }
  },
  computed: {
    currentStep() {
      return this.$store.getters["event/currentStep"];
    }
  }
};
</script>

<style lang="scss">
#stepper {
  background: transparent;
}
.step-buttons {
  margin-top: 32px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  button {
    height: 54px;
    width: 256px;
    color: #5c8896;
    border: 0;
    font-size: 16px;
    background-color: #3a3d4a;
    letter-spacing: 0.2rem;
    &:focus {
      border: 0px;
      outline: none;
      color: white;
      background: darken(#454c6b, 5%);
    }
    &:hover {
      border: 0;
      color: white;
      background: darken(#454c6b, 5%);
    }
  }
  .forward {
    i {
      font-size: 28px;
      padding-left: 32px;
    }
  }
  .back {
    i {
      font-size: 28px;
      padding-right: 32px;
    }
  }
}

.steps-container {
  border: 1px solid $cdarkborder;
  margin-top: 16px;
  border-radius: 2%;
  .step {
    background: $citembg;
    padding: 24px;
    border-right: 1px solid $cdarkborder;
    transition: 1s background ease;
    .step-title {
      font-weight: 300;
      letter-spacing: 1.1px;
      font-size: 18px;
      //   color: $cheading;
    }
    &::after {
      top: 0;
      right: 0;
      padding: 8px;
      border: 1px solid orange;
    }
  }
  .last {
    border-right: 0;
  }
  .active-step {
    background: $cprimary;
    color: white;
  }
}
</style>