<template>
    <div class="step-container">
        <div class="step-header has-text-centered">
            <div class="step-subtitle">
                PARTICIPANTS
            </div>
            <div class="step-title">
                Select who you'd like to invite
            </div>
        </div>

        <div class="columns">
            <div class="column is-half">
                <div class="search-container">
                    <div class="search-field">
                        <span class="mdi mdi-magnify"></span>
                        <input type="text" Placeholder="Search in friends list" v-model="searchTerm">
                    </div>
                    <div class="results-container">
                        <transition-group name="fade" mode="out-in" appear>
                            <div class="result" v-for="result in results" :key="result.friend_id" @click="toggleParticipant(result)" :class="isParticipant(result) ? 'is-participant' : ''">

                                <span>
                                    <i class="mdi mdi-check" v-if="isParticipant(result)"></i>
                                </span>
                                <div class="result-username">
                                    {{result.friend_displayname}}
                                </div>
                            </div>

                        </transition-group>
                    </div>
                </div>
            </div>
            <div class="column is-half">
                <div class="pa-container">
                    <div class="pa-header">
                        <div class="pa-header-title">
                            <span class="pa-title">Currently invited: </span>
                            <span class="n-of-pa">{{Object.keys(participants).length}}</span>
                            friends
                        </div>

                        <button class="button is-small invite-all-button" @click="inviteAll">INVITE ALL</button>
                    </div>
                    <div class="pa" v-for="pa in participants" :key="pa.friend_id">
                        <span class="pa-displayname">{{pa.friend_displayname}}</span>
                        <span class="toggle-pa" @click="toggleParticipant(pa)">
                            X
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Who",
  data() {
    return {
      participants: {},
      searchTerm: "",
      showResults: false,
      select: false
    };
  },
  watch: {
    searchTerm(value) {
      if (value.length >= 1) {
        this.showResults = true;
      } else {
        this.showResults = false;
      }
    }
  },
  mounted() {
    this.searchTerm = "";
    this.showResults = false;
  },
  methods: {
    inviteAll() {
      this.friends.forEach(friend => {
        this.$set(this.participants, friend.friend_id, friend);
      });
    },
    toggleParticipant(friend) {
      if (!this.isParticipant(friend)) {
        this.$set(this.participants, friend.friend_id, friend);
      } else {
        delete this.participants[friend.friend_id];
        this.participants = Object.assign({}, this.participants);
      }
    },
    randomAvatar() {
      return Math.floor(Math.random() * 70);
    }
  },
  computed: {
    isParticipant(r) {
      return r => {
        return this.participants.hasOwnProperty(r.friend_id);
      };
    },
    friends() {
      return this.$store.getters["friend/friends"];
    },
    results() {
      if (this.searchTerm.length >= 1) {
        return this.friends.filter(friend => {
          return (
            friend.friend_username.indexOf(this.searchTerm.toLowerCase()) > -1
          );
        });
      }
    },
    azPa() {}
  }
};
</script>

<style lang="scss" scoped>
.all-friends {
  margin-top: 24px;
  background: $citembg;
  color: $cprimary;
  padding: 8px;
  .invite-all-button {
    background: transparent;
    color: $cprimary;
    &:focus {
      outline: none;
    }
  }
}
.search-container {
  margin-top: 24px;
  width: 70%;
  height: 10vh;
  max-height: 10vh;
  min-height: 10vh;
  //   border: 1px solid $cdarkborder;
  .search-field {
    display: flex;
    border-bottom: 2px solid $cdarkborder;
    input {
      background: $cinputbg;
      border: 0;
      font-size: 18px;
      padding: 8px;
      width: 60%;
      flex: 1;
      color: $cheading;
      &:focus {
        outline: none;
      }
    }
    span {
      font-size: 18px;
      background: $cinputbg;
      padding: 12px 6px 8px 14px;
    }
  }
  .results-container {
    margin-top: 2px;
    font-size: 18px;
    border-radius: 4px;

    border-top: 0;
    .result {
      background: lighten($cinputbg, 8%);
      margin-bottom: 3px;
      border-radius: 2px;
      letter-spacing: 1.1px;
      display: flex;
      transition: all 0.8s ease;
      .result-username {
        padding: 8px 8px 8px 16px;
        flex: 1;
      }
      span {
        font-size: 18px;
        width: 24px;
        padding-top: 8px;
        padding-left: 12px;
      }
      &:hover {
        cursor: pointer;
        color: white;
      }
    }
    .is-participant {
      background: $cprimary;
      color: white;
    }
  }
}
.pa-container {
  margin-top: 24px;
  border-radius: 4px;

  .pa-header {
    // background: lighten($cmainbg, 3%);
    color: $cheading;
    font-size: 18px;
    text-transform: uppercase;
    width: 100%;
    border-radius: 3px;
    padding: 11px;
    display: flex;
    justify-content: space-between;
    .pa-header-title {
      flex: 1;
    }
    button {
      width: 30%;
      border: 1px solid $cprimary;
      background: $cinputbg;
      color: $cprimary;
      font-size: 12px;
      letter-spacing: 1.2px;
      &:focus {
        outline: none;
      }
    }
  }
  .pa {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    border-bottom: 1px solid $cdarkborder;
    border-radius: 3px;
    background: $citembg;

    flex: 1;

    .pa-displayname {
      flex: 1;
      padding: 8px;
      padding-left: 12px;
      line-height: 24px;
      font-size: 18px;
    }
    .toggle-pa {
      border: 0;
      //   font-size: 16px;
      padding: 8px 16px;
      background: $citembg;
      color: $cdangertext;
      cursor: pointer;
      //   line-height: 24px;
      border-radius: 3px;
      transition: all 0.5s ease;
      &:hover {
        background: lightcoral;
        color: white;
      }
    }
  }
  .n-of-pa {
    color: $cprimary;
  }
}
</style>