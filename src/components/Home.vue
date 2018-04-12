<template>

  <div class="container">

    <div class="columns">

      <div class="column box">

        <section class="section">
          <h1 class="title is-size-4 has-text-weight-light has-text-centered">Gather in a few steps</h1>
          <ul class="steps has-content-centered">
            <li class="steps-segment">
              <span class="steps-marker">1</span>
              <div class="steps-content heading">
                Create an event and suggest some dates
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker">2</span>
              <div class="steps-content heading">
                Easily invite your friends
              </div>
            </li>
            <li class="steps-segment ">
              <span class="steps-marker ">3</span>
              <div class="steps-content heading">
                Participants select their available dates
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker ">4</span>
              <div class="steps-content heading">
                Visually identify and select the most suitable date
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker ">5</span>
              <div class="steps-content heading ">
                Inform your participants and add the event to the calendar
              </div>
            </li>
          </ul>
        </section>

      </div>
    </div>
    <section class="hero is-small is-transparant">
      <div class="hero-body has-text-centered">
        <div class="title has-text-weight-light">
          <span class="has-text-primary">Create an account</span> or
          <span class="has-text-primary">sign in</span> to get started right away
        </div>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.hero {
  /* background-color: #17275e; */
}

.steps-segment {
  font-size: 14px;
}
</style>