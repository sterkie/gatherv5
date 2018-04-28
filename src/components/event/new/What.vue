<template>

  <div class="step-container">
    <div class="step-header has-text-centered">
      <div class="step-subtitle">
        PLAN A NEW EVENT
      </div>
      <div class="step-title">
        What do you have in mind?
      </div>
    </div>
    <form class="step-form">
      <div class="field">
        <label>Title</label>
        <input type="text" placeholder="e.g. Birthday Party" v-model="title" />
      </div>
      <div class="field">
        <label>Description</label>
        <textarea rows="4" v-model="description" placeholder="Enter some more information about the event for your participants. You can always change or add to this later."></textarea>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  name: "What",
  data() {
    return {
      title: "",
      description: ""
    };
  }
};
</script>

<style lang="scss">
.step-container {
  margin-top: 32px;
  // background: $citembg;
  // box-shadow: $citemshadow;
  .step-header {
    padding: 16px 32px;
    background: #333440;
    // border-bottom: 2px solid $cdarkborder;
    .step-title {
      font-size: 18px;
      color: $cheading;
      letter-spacing: 1.2px;
    }
    .step-subtitle {
      font-size: 24px;
      color: white;
      letter-spacing: 1.1px;
      // text-transform: uppercase;
    }
  }
  .step-form {
    margin-top: 32px;
    // padding: 16px;
    label {
      // border-left: 1px solid $cprimary;
      display: block;
      color: lighten(#637884, 10%);
      letter-spacing: 1.3px;
      font-weight: 200;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-size: 18px;
      padding-left: 4px;
    }
    input {
      background: $cinputbg;
      border: 0;
      width: 100%;
      padding: 8px;
      color: lighten($ctext, 30%);
      font-size: 18px;
      border-radius: 2px;
      margin-bottom: 8px;
      transition: background 0.8s ease;
      &::placeholder {
        color: lighten($ctext, 30%);
      }
      &:focus {
        outline: none;
        border: 0;
        background: lighten($cinputbg, 3%);
        color: white;
      }
    }
    textarea {
      width: 100%;
      background: $cinputbg;
      border: 0;
      padding: 8px;
      color: lighten($ctext, 10%);
      font-size: 18px;
      border-radius: 2px;
      resize: none;
      transition: background 0.8s ease;
      &::placeholder {
        color: lighten($ctext, 10%);
      }
      &:focus {
        outline: none;
        border: 0;
        background: lighten($cinputbg, 3%);
        color: white;
      }
    }
  }
}
</style>