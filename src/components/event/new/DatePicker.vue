<template>
  <div>
    <div class="picker">
      <div class="picker-header">
        <div class="year-minus-button pbutton" @click="selectedYear--">
          <span class="icon is-small">
            <i class="mdi mdi-chevron-double-left"></i>
          </span>
        </div>
        <div class="month-minus-button pbutton" @click="changeMonth(-1)">
          <span class="icon is-small">
            <i class="mdi mdi-chevron-left"></i>
          </span>
        </div>
        <div class="currently-selected">
          <div class="selected-month">
            {{selectedMonth+1 | showMonth }}
          </div>
          <div class="selected-year">
            {{selectedYear}}
          </div>
        </div>
        <div class="month-plus-button pbutton" @click="changeMonth(1)">
          <span class="icon is-small">
            <i class="mdi mdi-chevron-right"></i>
          </span>
        </div>
        <div class="year-plus-button pbutton" @click="selectedYear++">
          <span class="icon is-small">
            <i class="mdi mdi-chevron-double-right"></i>
          </span>
        </div>
      </div>
      <div class="picker-body">
        <div class="picker-item" v-for="day in displayy.days" :key="day">{{day}}</div>
        <div class="picker-item" @click="toggleSelect(item)" v-for="(item, index) in renderCalendar" :key="index" :class="[item.iscur? 'picker-enable' : 'picker-disable', selectIndex(item) >= 0 ? 'picker-select' : '']">
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      selectedDate: new Date(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      display: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "Year",
        "Month",
        "Cancel",
        "OK"
      ]
    };
  },
  props: {
    multi: {
      Type: Boolean,
      default: true
    },
    value: {
      type: Array | String | Date,
      default: () => []
    }
  },
  computed: {
    renderCalendar() {
      let current = new Date(this.selectedYear, this.selectedMonth, 1);
      let extras = (current.getDay() + 6) % 7;
      let firstDay = current.getDate() - extras;
      let res = [];
      for (let i = firstDay, index = 0; index < 42; i++, index++) {
        let day = new Date(this.selectedYear, this.selectedMonth, i, 8);
        let calObj = {
          label: day.getDate(),
          date: day,
          iscur: day.getMonth() === this.selectedMonth
        };
        res.push(calObj);
      }
      return res;
    },
    selected() {
      return this.value;
    },
    displayy() {
      var d = this.display;
      return {
        days: d.slice(0, 7),
        year: d[7],
        month: d[8],
        cancel: d[9],
        ok: d[10]
      };
    }
  },
  methods: {
    selectIndex: function(item) {
      if (!this.multi || !this.selected) {
        return -1;
      }
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].getTime() == item.date.getTime()) {
          return i;
        }
      }
      return -1;
    },
    cancelSelect: function() {
      if (this.multi) {
        this.selected.splice(0, this.selected.length);
      } else {
        this.selected = null;
      }
    },
    toggleSelect: function(item) {
      if (!this.multi) {
        this.submitSelect(item.date);
      } else {
        let index = this.selectIndex(item);
        if (index < 0) {
          this.selected.push(item.date);
        } else {
          this.selected.splice(index, 1);
        }
      }
    },
    changeMonth(num) {
      if (this.selectedMonth + num > 11) {
        this.selectedMonth = 0;
        this.selectedYear++;
      } else if (this.selectedMonth + num < 0) {
        this.selectedMonth = 11;
        this.selectedYear--;
      } else {
        this.selectedMonth += num;
      }
    },
    submitSelect: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang="scss">
.picker {
  width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border: 1px solid $cdarkborder;
  //   box-shadow: $citemshadow;
  background: $citembg;
  border-radius: 2px;
  line-height: 20px;
  .picker-header {
    display: flex;
    background: #3d7d92;
    font-size: 18px;
    width: 100%;
    justify-content: space-between;
    padding: 12px 8px;
    .pbutton {
      margin: 3px;
      cursor: pointer;
      padding: 5px;
      &:hover {
        color: $cprimary;
      }
    }
    .currently-selected {
      display: flex;
      flex-grow: 2;
      align-items: center;
      justify-content: center;
      .selected-month {
        padding: 0 16px;
      }
    }
  }
  .picker-body {
    flex-wrap: wrap;
    // width: calc(7*80px);
    display: flex;
    align-items: center;
    justify-content: center;
    .picker-item {
      justify-content: center;
      display: flex;
      padding: 8px;
      width: 48px;
      height: 48px;
      align-items: center;
      border-radius: 3px;
      transition: all 0.5s ease;
    }
    .picker-enable {
      cursor: pointer;
      &:hover {
        background-color: lighten($cmainbg, 10%);
      }
    }
    .picker-disable {
      cursor: default;
      color: darken(lightslategrey, 20%);
    }
    .picker-select {
      background-color: $cprimary;
    }
  }
}
</style>