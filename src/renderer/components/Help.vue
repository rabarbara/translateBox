<template>
  <div id="help" class="help_container">
    <h1 class="settings_heading">Help</h1>
    <div class="help">

  <div class="shortcut">
    <h2>Shortcut</h2>
    <p>Your current shortcut is
      <strong class="large">{{shortcut}}</strong>.</p>
    <p>
      You can press this key combination anytime to call up the TranslateBox or minimize it when you don't need it.
    </p>
    <p>Currently, there is no option to change this key combination.</p>
  </div>
  <div class="keys">
    <h2>API keys</h2>

  <p>
    For
    <strong>TranslateBox</strong> to display any dictionary words, you require an API key that you get from the website . </p><p>When you provide this key in the
    <router-link to="/settings">Settings</router-link> TranslateBox will be able to provide you with the dictionary service.</p>

  </div>

    </div>

    <div class="back">

  <router-link to="/">
    <button class="lookup_button">Back</button>
  </router-link>

    </div>
  </div>
</template>





<script>
// import _ from 'lodash'

export default {
  name: 'help',
  data () {
    return {
      shortcut: '',
      winProperties: {
        width: 0,
        height: 0,
        originalHeight: 0,
        originalWidth: 0
      },
      win: require('electron').remote.getCurrentWindow()
    }
  },
  methods: {
  },
  created () {
    let getScreenProperties = () => {
      let [width, height] = this.win.getSize()
      this.winProperties.width = Number(width)
      this.winProperties.height = Number(height)
      this.winProperties.originalWidth = Number(width)
      this.winProperties.originalHeight = Number(height)
    }
    return getScreenProperties()
  },
  mounted () {
    let settings = require('electron').remote.require('electron-settings')
    this.shortcut = settings.get('shortcut')
    this.win.setSize(635, 400)
  },
  beforeDestroy () {
    this.win.setContentSize(635, 260, true)
    this.winProperties.width = this.winProperties.originalWidth
    this.winProperties.height = this.winProperties.originalHeight
  }
}
</script>

<style lang="scss" scoped>
$main-color: white;
$background-color: rgb(117, 169, 255);
$alt-color: rgb(50, 50, 50);

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  background: $background-color;
}


h2 {
  color: white;
}

.settings_heading {
  color: $main-color;
  margin-bottom: .5em;
}


.lookup_button {
  font-weight: bold;
  border: 3px solid $main-color;
  background: rgba(255, 255, 255, 0);

  text-transform: uppercase;
  color: $main-color;
  cursor: pointer;
  padding: 1em;
  font-size: 1em;

  a {
    color: $main-color;
    text-decoration: none;
  }
}

a {
  color: $main-color; // text-decoration: none;
}



.help_container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100vh;
  justify-content: space-between;
}


.back {

  display: flex;
  justify-content: space-between;


}



.main_container {
  display: flex;
  justify-content: space-around;
  color: $main-color;
}

.large {
  font-size: 1.3em;
}
.help {
  display: flex;
  justify-content: space-around;
  .keys {
    padding-left: 10px;

  }
}

p {
  line-height: 1.5;
}
</style>
