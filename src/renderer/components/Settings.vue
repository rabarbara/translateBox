<template>
  <div id="settings" class="input-form">
    <div class="input-form-container ">
      <div class="animated slideInLeft">
        <h1 class="settings_heading">Dictionary keys</h1>
      
      <div class="input-elements">
        <select name="collegiate" id="collegiate">
          <option value="md">Medical</option>
          <option value="col">Collegiate</option>
        </select>
        <input type="text" v-model="apiKey" placeholder="Paste your api key here" @keypress.enter="inputApiKey()">
      </div>
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
  $alt-color: rgb(50, 50, 50);
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
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
  select {
    background: $main-color;
    border: 3px solid $alt-color;
    color: $alt-color;
    padding: .5em;
    font-size: .8em;
    font-weight: bold;
  }

</style>
