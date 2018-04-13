<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <div class="heading is-size-5">
                    Overview
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="tabs is-toggle is-small">
                  <ul>
                    <li class="is-active">
                      <a>
                        <span>All</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span>Confirmed</span>
                      </a>
                    </li>
                    <li>
                      <a>

                        <span>Pending</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div class="dashboard--overview-container">
              hi there
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <div class="heading is-size-5">
                    Activity
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <p class="is-size-7 has-text-primary">
                    See all
                  </p>
                </div>
              </div>
            </nav>
            <div class="dashboard--activity-block has-text-centered">
              <article class="media ">
                <figure class="media-left ">
                  <p class="image is-32x32">
                    <img src="http://i.pravatar.cc/32">
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
                    <img src="http://i.pravatar.cc/32?img=3">
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
                    <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d">
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
                    <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d">
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
                    <img src="http://i.pravatar.cc/32?u=a042581f4e29026704d">
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
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  }
};
</script>

<style scoped>
.box {
  padding: 6px;
  background-color: #afafaf;
}

.level {
  margin-bottom: 6px;
  padding-bottom: 0px;
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
.valign-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.activity-message {
  padding-top: 8px;
}

.overview--tab {
  background-color: white;
  padding: 6px;
}
</style>