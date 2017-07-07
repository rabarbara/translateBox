<template>
  <div id="settings" class="input-form">
    <div class="input-form-container">
      <div>
        <h1 class="settings_heading">Dictionary keys</h1>
      <input type="text" v-model="apiKey" placeholder="Paste your api key here" @keypress.enter="inputApiKey()">
      </div>
    </div>
  </div>
</template>

<script>
import electron from 'electron'
export default {
  name: 'settings',
  // components: { Explanations },
  data () {
    return {
      apiKey: '',
      print: ''
    }
  },
  computed: {
  },
  methods: {
    inputApiKey () {
      let settings = electron.remote.require('electron-settings')
      let apiKey = this.apiKey
      settings.set('medical', apiKey)
    },
    displays () {
      let settings = electron.remote.require('electron-settings')
      this.print = settings.get('medical')
    }
  }
}
</script>

<style lang="scss">

  $main-color: white;
  $background-color: rgb(117, 169, 255);


@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body { font-family: 'Source Sans Pro', sans-serif; background: $background-color;}
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
    justify-content: flex-start;
    // align-items: center;
    height: 100%;

    & > div {
      margin-top: 1em;
      margin-left: 2em;
    }
    input {
      background-color: $background-color;
      border: 3px solid $main-color;
      padding: 1em;
      color: $main-color;
      font-size: 1em;
    }
  }
  .settings_heading {
    color: $main-color;
    margin-bottom: .5em;

  }

</style>
