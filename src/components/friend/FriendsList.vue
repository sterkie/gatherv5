<template>
  <!-- <div class="container"> -->
  <div class="columns ">
    <div class="column is-one-third">
      <div class="friends--container">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="friends-page-header">
                <!-- <span class="icon">
                  <i class="mdi mdi-account-multiple mdi-36px"></i>
                </span> -->
                <span class="has-text-weight-light page-title is-size-4">FRIENDS</span>
              </div>
            </div>
          </div>
          <div class="level-right">

            <div class="level-item" v-if="!showAddFriend">
              <button class="button add-friend-button" @click="showAddFriend = true">
                <span class="icon is-small">
                  <i class="mdi mdi-plus"></i>
                </span>
                Add a friend</button>
            </div>
            <div class="level-item" v-if="showAddFriend">
              <button class="button cancel-add-friend-button" @click="cancelFriendRequest">
                Cancel</button>
            </div>

          </div>
        </nav>
        <transition name="fade" mode="out-in" tag="div">
          <div class="add-friend-container" v-if="showAddFriend">
            <input type="text" placeholder="Enter a username..." v-model="potentialFriend" @input="$v.potentialFriend.$touch">
            <button class="button friend-request-button" @click="sendFriendRequest">
              <span class="icon is-large">
                <i class="mdi mdi-plus" style="font-size: 24px"></i>
              </span>
            </button>
          </div>
        </transition>

        <transition name="fade" tag="div">
          <div v-if="doesntExistMsg.length" class="danger"> {{doesntExistMsg}} </div>
          <div v-if="selfAddedMsg.length" class="danger">{{selfAddedMsg}} </div>
          <div v-if="alreadyFriendsMsg.length" class="danger">{{alreadyFriendsMsg}}</div>
          <div v-if="invalidUserNameMsg.length" class="danger">{{ invalidUserNameMsg }}</div>
          <div v-if="requestSentMsg.length" class="success">
            <i class="mdi mdi-check"></i>{{ requestSentMsg }}</div>
        </transition>

        <div class="requests--container">
          <div class="friends--card">
            <div class="friends--card-header">
              <h3 class="is-size-5 has-text-weight-light">Requests
                <span class=" is-size-5" :class="{'has-text-primary': requests.length}"> ( {{requests.length ? requests.length : 'None'}} )</span>
              </h3>
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
                  <div class="level-item">
                    <div class="button accept-request" @click="acceptFriendRequest(request)">Accept</div>
                  </div>
                  <div class="level-item">
                    <div class="button decline-request" @click="declineFriendRequest(request)">Decline</div>
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
                  <h3 class="is-size-5 has-text-weight-light">Current friends
                    <span :class="{'has-text-primary': friends.length}"> ( {{friends.length ? friends.length : 'None'}} )</span>
                  </h3>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item filter-container">
                  <input type="text" placeholder="Filter" class="filter-input" v-model="searchTerm">
                  <i class="mdi mdi-magnify"></i>
                </div>
              </div>
            </nav>
          </div>
          <transition-group name="fade" mode="out-in">
            <div class="friends--card-content is-size-6" v-for="(friend, index) in filteredFriends" :key="friend.friend_id" @click="viewProfile(friend.friend_username)">
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
                    <div class="button danger" @click="removeFriend(friend)">Remove</div>
                  </div>
                </div>
              </nav>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="column is-two-fifths profile-column">
      <transition name="fade" appear>
        <router-view></router-view>
      </transition>
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { alphaNum } from "vuelidate/lib/validators";
import { fs } from "../../firebase_config";

export default {
  name: "FriendsList",
  validations: {
    potentialFriend: {
      alphaNum
    }
  },
  data() {
    return {
      requestSentMsg: "",
      doesntExistMsg: "",
      potentialFriend: "",
      showAddFriend: false,
      alreadyFriendsMsg: "",
      selfAddedMsg: "",
      invalidUserNameMsg: "",
      searchTerm: ""
    };
  },
  created() {
    this.resetMsgs();
    this.showAddFriend = false;
  },
  methods: {
    alreadyFriends(pfriend) {
      let index = this.friends.findIndex(
        user => user.friend_username === pfriend
      );
      return index < 0 ? false : true;
    },

    addSelf(pfriend) {
      return this.user.username === pfriend ? true : false;
    },

    resetMsgs() {
      this.alreadyFriendsMsg = "";
      this.selfAddedMsg = "";
      this.doesntExistMsg = "";
      this.requestSentMsg = "";
      this.invalidUserNameMsg = "";
    },

    sendFriendRequest() {
      this.resetMsgs();
      let pfriend = this.potentialFriend.toLowerCase();
      console.log(pfriend);
      if (pfriend.length > 2) {
        if (this.alreadyFriends(pfriend)) {
          this.alreadyFriendsMsg = "You are already friends";
        } else if (this.addSelf(pfriend)) {
          this.alreadyFriendsMsg =
            "You tried to send yourself a friend-request";
        } else if (!this.$v.potentialFriend.alphaNum) {
          this.invalidUserNameMsg =
            "A username can only contain letters and numbers";
        } else {
          let ref = fs.collection("users").where("username", "==", pfriend);
          ref.get().then(snap => {
            if (!snap.empty) {
              this.showAddFriend = false;
              this.potentialFriend = "";
              snap.forEach(doc => {
                this.$store.dispatch(
                  "friend/SEND_FRIEND_REQUEST",
                  doc.data().id
                );
                this.requestSentMsg = `Sent a friend request to ${
                  doc.data().displayname
                }`;
                setTimeout(() => {
                  this.resetMsgs();
                }, 5000);
              });
              // USER DOESNT EXIST
            } else {
              this.doesntExistMsg = "This user does not exist";
            }
          });
        }
      }
    },
    cancelFriendRequest() {
      this.potentialFriend = "";
      this.resetMsgs();
      this.showAddFriend = false;
    },

    acceptFriendRequest(request) {
      this.$store.dispatch("friend/ACCEPT_FRIEND_REQUEST", request);
    },

    declineFriendRequest(request) {
      this.$store.dispatch("friend/DECLINE_FRIEND_REQUEST", request);
    },

    removeFriend(friend) {
      this.$store.dispatch("friend/REMOVE_FRIEND", friend);
    },

    viewProfile(username) {
      console.log(username);
      this.$router.push({ path: `/friends/${username}` });
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
    },
    filteredFriends() {
      let st = this.searchTerm;
      let friends = this.friends;
      if (!st.length) {
        return friends;
      }
      return friends.filter(friend => {
        return friend.friend_username.indexOf(st.toLowerCase()) > -1;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.add-friend-container {
  // background: #383b48;
  color: white;
  // padding: 6px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 16px;

  input {
    background: #292a31;
    color: white;
    border: 0;
    width: 90%;
    height: 32px;
    padding: 8px;
    outline: none;
    &::placeholder {
      color: #80b3c3;
    }
  }
  button {
    border: 1px solid #43afd2;
    color: white;
    background: #43afd2;
    width: 10%;
    position: absolute;
    right: 0px;
    transition: 0.2s border ease;
    &:hover {
      background: darken(#43afd2, 10%);
    }
  }
}
.friends--container {
  padding: 18px;
  align-items: center;
  margin-bottom: 16px;
  .friends--card {
    .friends--card-header {
      background: #353848;
      padding: 8px;
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
    &:hover {
      background: lighten(#333440, 3%);
      cursor: pointer;
    }
  }
}
.friends-page-header {
  color: #596477;
  padding-left: 2px;
  // margin-bottom: 16px;
  .page-title {
    padding-left: 0px;
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
    background: #3d4152;
    border: 0px;
    font-size: 1.1rem;
    padding-left: 24px;
    padding-bottom: 4px;
    padding-top: 6px;
    outline: none;
    width: 100%;
    color: lightblue;
    box-sizing: border-box;
    height: 36px;

    &::placeholder {
      color: rgb(151, 172, 182);
      padding: 6px;
    }
  }
  i {
    position: absolute;
    padding-right: 3px;
    font-size: 1.3rem;
    left: 6px;
    top: 6px;
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
  margin-top: 16px;
  padding-bottom: 16px;
}

.add-friend-button {
  background-color: transparent;
  border-color: #176680;
  color: #43afd2;
  .icon {
    padding-right: 7px;
  }
  &:hover {
    border-color: lighten(#176680, 15%);
    color: lighten(#43afd2, 15%);
  }
  &:focus {
    outline: none;
  }
}

.mdi-sort-alphabetical {
  font-size: 1.4rem;
}

.danger {
  padding: 6px;
  color: #9a3f3f;
  background: transparent;
  margin-top: 0px;
  border: 1px solid #79303f;
  &:hover {
    border: 1px solid lighten(#78303f, 10%);
  }
}

.success {
  padding: 6px;
  color: #9eb19e;
  background: transparent;
  margin-top: 0;
  border: 1px solid #39946c;
  outline: none;
  &:hover {
    color: lighten(#39946c, 10%);
  }
}

.cancel-add-friend-button {
  background-color: transparent;
  color: #9a3f3f;
  border: 0px;
  outline: none;
  .icon {
    padding-right: 7px;
  }
  &:hover {
    color: lighten(#9a3f3f, 10%);
  }
  &:focus {
    box-shadow: none;
  }
}
.accept-request {
  background-color: transparent;
  border-color: #39946c;
  color: #9eb19e;
  &:hover {
    border-color: lighten(#39946c, 15%);
  }
}
.decline-request {
  background-color: transparent;
  border-color: #79303f;
  color: #9a3f3f;
  &:hover {
    border-color: lighten(#79303f, 15%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>




