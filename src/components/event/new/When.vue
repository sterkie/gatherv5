<template>
  <div class="step-container">
    <div class="step-header has-text-centered">
      <div class="step-subtitle">
        EVENT TIME
      </div>
      <div class="step-title">
        Select one or more dates for your participants to vote on
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <DatePicker :multi="!voting" v-model="dates" class="picker" />
      </div>
      <div class="column is-half">
        <div class="selected-container ">
          <div class="selected-header">
            SELECTED DATES (
            <span class="number-of-dates">{{dates.length}}</span> )
          </div>
          <transition-group name="fade" mode="out-in">
            <div class="selected-dates" v-for="(date, index) in orderedDates" :key="index">
              <div class="selected-date">
                {{date | longdate }}
              </div>
              <span class="button-remove-date" @click="removeDate(date)">
                X
              </span>

            </div>
          </transition-group>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import moment from "moment";
export default {
  name: "When",
  components: {
    DatePicker
  },
  data() {
    return {
      dates: []
    };
  },
  methods: {
    removeDate(d) {
      let datesUnix = this.dates.map(date => {
        return date.getTime();
      });
      let index = datesUnix.findIndex(date => date === d);
      this.dates.splice(index, 1);
    }
  },
  computed: {
    voting() {
      return this.$store.getters["event/dateSet"];
    },
    orderedDates() {
      if (this.dates.length <= 1) {
        return this.dates;
      }
      let mapped = this.dates.map(date => {
        return date.getTime();
      });
      let sorted = mapped.sort((a, b) => {
        return a > b;
      });
      return sorted;
    }
  }
};
</script>

<style scoped lang="scss">
.picker {
  margin: 0 auto;
}
.columns {
  margin-top: 32px;
}

.selected-container {
  width: 70%;

  .selected-header {
    // background: #383946;
    padding: 8px;
    color: $cheading;
    // border-left: 2px solid $cprimary;
    font-size: 18px;
    margin-bottom: 12px;
    letter-spacing: 1.2px;
    .number-of-dates {
      color: $cprimary;
      padding-top: 0px;
    }
  }
  .selected-dates {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    border-bottom: 1px solid $cdarkborder;

    border-radius: 3px;
    .selected-date {
      background: $citembg;
      font-size: 20px;
      flex: 1;
      padding: 8px;
      line-height: 24px;
    }
    .button-remove-date {
      border: 0;
      //   font-size: 16px;
      padding: 8px 16px;
      background: $citembg;
      color: $cdangertext;
      cursor: pointer;
      line-height: 24px;
      border-radius: 3px;
      transition: all 0.5s ease;
      &:hover {
        background: lightcoral;
        color: white;
      }
    }
  }
}
</style>