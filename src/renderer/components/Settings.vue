<template>
  <div id="settings" class="input-form">
    <div class="input-form-container">
      <div>
        <h1>Dictionary key</h1>
      <input type="text" v-model="apikey" placeholder="Paste your api key here">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    // components: { Explanations },
    data () {
      return {
        apikey: ''
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss">
  $main-color: white;
  $background-color: rgb(117, 169, 255);

  .input-form {
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $background-color;
  }
  .input-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    input {
      background-color: $background-color;
      border: 3px solid $main-color;
      padding: 1em;
      color: $main-color;
      font-size: 1em;
    }
  }

</style>
