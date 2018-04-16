<template>
    <div class="container">
        <h3 class="title is-size-3 has-text-weight-light has-text-centered has-text-grey page--title">NEW EVENT</h3>
        <form @submit.prevent="addEvent">
            <div class="columns is-gapless">
                <div class="column is-two-thirds">
                    <div class="event--form-container">
                        <div class=" event-create-part">
                            <div class="event-create-part-header">
                                <h3 class="subtitle is-size-5">Enter some basic information</h3>
                            </div>
                            <div class="field">
                                <label class="label is-small">Select a title for your event</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="e.g. Mike's birthday party" v-model.trim="title">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small ">Location</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Set the scene" v-model.trim="location">
                                </div>
                                <p class="help has-text-grey">You'll be able to include more detailed directions after you create the event</p>
                            </div>
                            <div class="field">
                                <label class="label is-small ">Short description</label>
                                <div class="field">
                                    <div class="control">
                                        <textarea class="textarea" placeholder="What is all the fuss about?"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" event-create-part">
                            <div class="event-create-part-header">
                                <h3 class="subtitle is-size-5">When is it going down?</h3>
                            </div>
                            <b-field label="Would you like to include a poll to decide the date?" custom-class="is-small" required>
                                <b-select v-model="event_status" size="is-small">
                                    <option value="planned">No, the date is already decided.</option>
                                    <option value="voting">Yes, let participants vote on the most suitable date</option>
                                </b-select>
                            </b-field>
                            <div class="field" v-if="event_status === 'planned'">
                                <label class="label is-small ">Pick the event date</label>
                                <div class="control">
                                    <DatePicker v-model="date" :multi="false" />
                                </div>

                            </div>
                            <div class="field" v-if="event_status === 'voting'">
                                <label class="label is-small">Suggested dates</label>
                                <div class="control">
                                    <DatePicker v-model="suggestedDates" :multi="true" />
                                </div>
                                <p class="help has-text-grey">You can select up to 6</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="column is-one-third">
                    <div class=" inviter-box">
                        <div class="event-create-part-header">
                            <h3 class="subtitle is-size-5">Invite your friends!</h3>
                        </div>
                    </div>
                </div>

            </div>
            <div class="field is-grouped field-buttons">
                <div class="control">
                    <button class="button is-primary add-event-button is-small" type="submit">
                        SUBMIT
                    </button>
                </div>
                <div class="control">
                    <button class="button is-dark is-outlined is-small">
                        CANCEL
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
export default {
  name: "EventCreate",
  data() {
    return {
      title: "",
      suggestedDates: [],
      location: "",
      event_status: "",
      date: ""
    };
  },
  components: {
    DatePicker
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    addEvent() {
      let eventObj = {
        title: this.title,
        location: this.location,
        suggestedDates: this.suggestedDates,
        event_status: this.event_status,
        date: this.date
      };
      this.$store.dispatch("event/ADD_EVENT", eventObj);
      this.suggestedDates = [];
    },
    cancelAdd() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.box {
  margin-bottom: 6px;
}
.input {
  font-size: 14px;
}
.textarea {
  font-size: 14px;
}

.select {
  font-size: 14px;
}

.inviter-box {
  height: 100%;
  margin-left: 32px;
}

.event-create-part {
  margin-bottom: 16px;
}

.event-create-part-header {
  background-color: #c8c9ca70;
  margin-bottom: 18px;
  padding: 16px 16px 16px 8px;
}

.page--title {
  margin-top: 18px;
}
</style>