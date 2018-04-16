<template>
  <div>
    <div class="container" v-if="!loading">
      <div v-if="user" class="page--title">
        <h3 class="title is-size-3 has-text-weight-light has-text-centered has-text-grey">Welcome back, {{user.displayname}}</h3>
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="dashboard-header">
            <nav class="level is-centered">
              <div class="level-left">
                <div class="level-item">
                </div>
              </div>
              <div class="level-item">
                <h3 class="subtitle is-size-3 has-text-centered page-title has-text-weight-bold">Overview</h3>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div class="tabs is-toggle is-small">
                    <ul>
                      <li class="is-active">
                        <a>
                          <span>All</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>Planned</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>Voting</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>Completed</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div class="events-container">

            <div class="event-item" v-for="event in events" :key="event.id">
              <h5 class="title is-5">{{event.title}}</h5>
            </div>

          </div>
        </div>

        <div class="column is-one-third activity-column">
          <div class="activity-header">
            <h3 class="subtitle is-size-3 has-text-centered has-text-weight-light">Activity</h3>
          </div>

          <div class="dashboard--activity-block">
            <article class="media ">
              <figure class="media-left ">
                <p class="image is-32x32">
                  <img src="http://i.pravatar.cc/32" class="rounded">
                </p>
              </figure>
              <div class="media-content">
                <p class="heading activity-message">
                  <strong>Joppe</strong> invited you to event:
                  <strong class="has-text-primary">BBQ</strong>
                </p>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">

                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p class=" is-size-7">8 minutes ago</p>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <div class="dashboard--activity-block">
            <article class="media ">
              <figure class="media-left ">
                <p class="image is-32x32">
                  <img src="http://i.pravatar.cc/32?img=3" class="rounded">
                </p>
              </figure>
              <div class="media-content">
                <p class="heading activity-message">
                  <strong>Hade</strong> confirmed a date for event:
                  <strong class="has-text-primary">Gentse feesten</strong>
                </p>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">

                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p class=" is-size-7">8 minutes ago</p>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <div class="dashboard--activity-block">
            <article class="media ">
              <figure class="media-left ">
                <p class="image is-32x32">
                  <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d" class="rounded">
                </p>
              </figure>
              <div class="media-content">
                <p class="heading activity-message">
                  <strong>Joppe</strong> invited you to event:
                  <strong class="has-text-primary">BBQ</strong>
                </p>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">

                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p class=" is-size-7">8 minutes ago</p>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <div class="dashboard--activity-block">
            <article class="media ">
              <figure class="media-left ">
                <p class="image is-32x32">
                  <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d" class="rounded">
                </p>
              </figure>
              <div class="media-content">
                <p class="heading activity-message">
                  <strong>Joppe</strong> invited you to event:
                  <strong class="has-text-primary">BBQ</strong>
                </p>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">

                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p class=" is-size-7">8 minutes ago</p>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <div class="dashboard--activity-block">
            <article class="media ">
              <figure class="media-left ">
                <p class="image is-32x32">
                  <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d" class="rounded">
                </p>
              </figure>
              <div class="media-content">
                <p class="heading activity-message">
                  <strong>Joppe</strong> invited you to event:
                  <strong class="has-text-primary">BBQ</strong>
                </p>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">

                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p class=" is-size-7">8 minutes ago</p>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    events() {
      return this.$store.getters["event/events"];
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.event-item {
  background: #f7f7f7;
  height: 147px;
  border-left: 3px solid rgb(20, 31, 37);
  margin-bottom: 9px;
  padding: 9px;
  border-radius: 2px;
}
.box {
  background-color: #afafaf;
}

.activity-column {
  margin-right: 0px;
  padding-right: 0px;
}

.level {
  padding-bottom: 0px;
}

.dashboard-header {
  background-color: #c8c9ca70;
  padding: 16px 16px 16px 16px;
  height: 72px;
  margin-bottom: 9px;
}

.dashboard--activity-block {
  padding: 16px;
  background-color: #f7f7f7;
  height: 72px;
  margin-bottom: 3px;
  border-radius: 2px;
}
.dashboard--overview-container {
  padding: 6px;
  background-color: #f7f7f7;
  height: 100%;
  border-radius: 2px;
}

.activity-message {
  padding-top: 8px;
}

.overview--tab {
  background-color: white;
  padding: 6px;
}

.rounded {
  border-radius: 50%;
}

.activity-header {
  background-color: #c8c9ca70;
  height: 72px;
  margin-bottom: 9px;
  padding: 16px 16px 16px 16px;
}

.tabs {
  margin-top: 2px;
}

.page-title {
  padding-left: 128px;
}
</style>