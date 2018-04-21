<template>
  <div class="container">
    <div class="container">
      <div class="columns ">
        <div class="column is-half">
          <div class="friends--container">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <div class="friends-page-header">
                    <span class="icon">
                      <i class="mdi mdi-account-multiple mdi-36px"></i>
                    </span>
                    <span class="has-text-weight-light page-title is-size-4">FRIENDS</span>
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button add-friend-button">
                    <span class="icon is-small">
                      <i class="mdi mdi-plus"></i>
                    </span>
                    Add a Friend</button>
                </div>
              </div>
            </nav>
            <div class="requests--container">
              <div class="friends--card">
                <div class="friends--card-header">
                  <h3 class="is-size-5 has-text-weight-light">Requests (
                    <span class="has-text-grey is-size-6">{{requests.length > 0 ? requests.length : 'None'}}</span> )</h3>
                </div>
                <div class="friends--card-content is-size-6" v-for="request in requests" :key="request.friend_id">
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <img :src="'http://i.pravatar.cc/' + randomAvatar" class="avatar">
                      </div>
                      <div class="level-item">
                        <span class="request--username ">{{request.requester_displayname}}</span> wants to be your friend
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item request--accept">
                        <div class="button is-success">Accept</div>
                      </div>
                      <div class="level-item request--decline">
                        <div class="tag is-danger">Decline</div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div class="friends--card">
              <div class="friends--card-header">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <h3 class="is-size-5 has-text-weight-light">Current friends (
                        <span class="has-text-primary is-size-6">{{friends.length}}</span> )</h3>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item filter-container">
                      <input type="text" placeholder="Filter" class="filter-input">
                      <i class="mdi mdi-magnify"></i>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="friends--card-content is-size-6" v-for="(friend, index) in friends" :key="friend.friend_id">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <img :src="'http://i.pravatar.cc/' + (index * 10) + 20" class="avatar">
                    </div>
                    <div class="level-item">
                      <span class="request--username ">{{friend.friend_displayname}}</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item request--decline">
                      <div class="button remove-friend-button">Remove</div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div class="column is-one-third">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fs } from "../../firebase_config";
export default {
  name: "FriendsList",
  data() {
    return {
      doesntExist: "",
      potentialFriend: "",
      showAddFriend: false
    };
  },
  methods: {
    sendFriendRequest() {
      let potential_friend = this.potentialFriend.toLowerCase();
      if (potential_friend.length > 2) {
        let ref = fs
          .collection("users")
          .where("username", "==", potential_friend);
        ref.get().then(snap => {
          if (!snap.empty) {
            snap.forEach(doc => {
              this.$store.dispatch("friend/SEND_FRIEND_REQUEST", doc.data().id);
              this.authError = "";
            });
          } else {
            this.doesntExist = "This user does not exist";
          }
        });
      }
    },

    acceptFriendRequest(request) {
      this.$store.dispatch("friend/ACCEPT_FRIEND_REQUEST", request);
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    friends() {
      return this.$store.getters["friend/friends"];
    },
    requests() {
      return this.$store.getters["friend/requests"];
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    randomAvatar() {
      return Math.floor(Math.random() * 70);
    }
  }
};
</script>

<style scoped lang="scss">
.friends--container {
  padding: 24px;
  align-items: center;
  margin-bottom: 16px;
  .friends--card {
    .friends--card-header {
      background: #353848;
      padding: 14px;
      // border: 2px solid #333544;
      border-bottom: 3px solid #272c35;
      color: #596477;
      // margin-bottom: 1px;
    }
  }
  .friends--card-content {
    padding: 10px;
    // margin-top: 2px;
    margin-bottom: 3px;
    background: #333440;
    // border-bottom-left-radius: 3px;
    // border-bottom-right-radius: 3px;
    // border: 1px solid #2c2d33;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 100%;
  }
}
.friends-page-header {
  color: #596477;
  padding-left: 11px;
  // margin-bottom: 16px;
  .page-title {
    padding-left: 14px;
  }
  .icon {
    position: relative;
    top: 4px;
    right: 2px;
  }
}

.filter-container {
  display: inline-block;
  position: relative;
  input {
    background: transparent;
    border: 0px;
    font-size: 1rem;
    padding: 2px;
    padding-top: 6px;
    outline: none;
    width: 100%;
    color: lightblue;
    box-sizing: border-box;
    border-bottom: 1px solid #5379a7;
    &::placeholder {
      color: rgb(151, 172, 182);
    }
  }
  i {
    position: absolute;
    padding-top: -1px;
    padding-left: 14px;
    font-size: 1.3rem;
    right: 0px;
    top: 2px;
  }
}

.avatar {
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
.tag {
  margin-top: 2px;
  font-size: 10px;
}
.request--username {
  padding-right: 4px;
  letter-spacing: 1px;
  color: #687080;
}
.requests--container {
  padding-bottom: 16px;
}

.add-friend--container {
  padding-bottom: 16px;
}

.add-friend-button {
  background-color: transparent;
  border-color: #43afd2;
  color: #80b3c3;
  .icon {
    padding-right: 7px;
  }
  &:hover {
    border-color: lighten(#43afd2, 15%);
  }
}

.remove-friend-button {
  background-color: transparent;
  border-color: #79303f;
  color: #9a3f3f;
  &:hover {
    border-color: lighten(#79303f, 15%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>




