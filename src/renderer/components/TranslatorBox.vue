<template>
  <div id="container">
    <main>
      <div class="lookup_container">
        <div class="utilities">

          <div class="reposition">

            <svg class="icon icon-enlarge">
              <use xlink:href="#icon-enlarge"></use>
            </svg>
            <symbol id="icon-enlarge" viewBox="0 0 32 32">
              <title>enlarge</title>
              <path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z"></path>
              <path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z"></path>
              <path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z"></path>
              <path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z"></path>
            </symbol>
          </div>
          <div class="poweroff" @click="powerOff">
            <svg class="icon icon-switch">
              <use xlink:href="#icon-switch"></use>
            </svg>
            <symbol id="icon-switch" viewBox="0 0 32 32">
              <title>Exit App</title>
              <path d="M20 4.581v4.249c1.131 0.494 2.172 1.2 3.071 2.099 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c0.899-0.899 1.94-1.606 3.071-2.099v-4.249c-5.783 1.721-10 7.077-10 13.419 0 7.732 6.268 14 14 14s14-6.268 14-14c0-6.342-4.217-11.698-10-13.419zM14 0h4v16h-4z"></path>
            </symbol>
          </div>

        </div>
        <h1 class="lookup_heading">What do you want to know?</h1>
        <div class="lookup_search">
          <input type="text" v-model="inputText" @keyup.enter="lookUp()" autofocus class="lookup_input" placeholder="Type in your word ...">
          <button @click="lookUp()" class="lookup_button hvr-sweep-to-right">Search</button>
        </div>
        <div v-if="errorMessage">Oops, something went wrong with the dictionary.
          <pre>
            {{this.errorMessage}}
          </pre>
        </div>
        <div class="spinner" v-bind:class="{hide:!spinner}">
          <div>
            <div class="cube_container">
              <div class="sk-folding-cube">
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
              </div>
            </div>
            <div class="looking_for" v-bind:class="{hide:!spinner}">Searching for: {{inputText}}</div>
          </div>
        </div>
      </div>
      <div class="settings">
        <span class="settings-item" @click="resizeToOriginal(0)"><router-link  to="/settings">Settings</router-link></span>
        <span>Help</span>
      </div>
      <Explanations v-if="displayExplanation" v-bind:display="displayExplanation" v-bind:explanation="this.explanation" v-on:followUp="followUp"
        v-bind:class="{hide:spinner}"></Explanations>
    </main>
  </div>
</template>



<script>
  import axios from 'axios'
  import credentials from '@/components/credentials/credential'
  import Explanations from '@/components/Explanations'
  import electron from 'electron'

  // to get around the http CORS issue, explicitly require the http adapter by Node instead of Chrome
  // the other one throws CORS errors
  axios.defaults.adapter = require('axios/lib/adapters/http')

  export default {
    name: 'translator-box',
    components: { Explanations },
    data () {
      return {
        inputText: '',
        explanation: '',
        credentials: credentials,
        spinner: false,
        error: false,
        errorMessage: '',
        dictType: 'medical',
        defaultdictType: 'medical',
        dicts: {
          'medical': {
            url: 'http://www.dictionaryapi.com/api/references/medical/v2/xml/',
            key: ''
          },
          'collegiate': {
            url: 'http://www.dictionaryapi.com/api/references/collegiate/v2/xml/',
            key: ''
          }
        },
        winProperties: {
          width: 0,
          height: 0,
          originalHeight: 0,
          originalWidth: 0
        },
        displayExplanation: false
      }
    },
    computed: {
    },
    watch: {
      inputText: function () {
        if (!this.inputText) {
          this.displayExplanation = false
          this.resize(0)
        }
      }
    },
    methods: {
      powerOff () {
        const remote = require('electron').remote
        let w = remote.getCurrentWindow()
        w.close()
      },
      lookUp (term = this.inputText) {
        if (this.inputText) {
          this.spinner = true
          let lookUpUrl = `${this.dicts[this.dictType].url}${encodeURI(term.trim())}?key=${this.dicts[this.dictType].key}`
          axios.get(lookUpUrl)
            .then(response => {
              console.log(response.status, response.data)
              this.spinner = false
              this.explanation = response.data
              this.resize()
              this.displayExplanation = true
            })
            .catch(e => {
              this.error = true
              this.errorMessage = e
            })
        }
      },
      followUp (term) {
        this.inputText = term.toLowerCase()
        return this.lookUp(term)
      },
      resize (expand = true) {
        /* eslint-disable no-unused-vars */
        let {width, height} = electron.remote.screen.getPrimaryDisplay().workAreaSize
        let win = electron.remote.getCurrentWindow()
        let [contentWidth, contentHeight] = win.getContentSize()
        let [positionX, positionY] = win.getPosition()
        let extraHeight = height - positionY - 30
        expand ? win.setSize(contentWidth, extraHeight, true) : win.setSize(contentWidth, this.winProperties.height, true)
      },
      resizeToOriginal () {
        let win = electron.remote.getCurrentWindow()
        win.setSize(this.winProperties.originalWidth, this.winProperties.originalHeight)
      }
    },
    created () {
      let getScreenProperties = () => {
        let win = electron.remote.getCurrentWindow()
        let [width, height] = win.getSize()
        this.winProperties.width = Number(width)
        this.winProperties.height = Number(height)
        this.winProperties.originalWidth = Number(width)
        this.winProperties.originalHeight = Number(height)
      }
      return getScreenProperties()
    },
    mounted () {
      let settings = require('electron').remote.require('electron-settings').get('apiKeys')
      for (let key in settings) {
        console.log(key)
        this.dicts[key.toLowerCase()].key = settings[key]
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

body {
  font-family: 'Source Sans Pro', sans-serif;
  background: $background-color;
}

.spinner {
  background: $background-color;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  .looking_for {
    flex: 1 0 100%;
    margin-top: 2em;
    color: $main-color;
    font-size: 2em;
  }
  .cube_container {
    flex: 1 0 100%;
  }
}

.hide {
  display: none;
}

main {
  width: 90%;
  margin: 0 auto;
  max-width: 560px;
}

.lookup_container {
  position: relative;
  border: 3px solid $main-color;
  padding: 2em;
  box-shadow: .1em .1em .1em rgba(255, 255, 255, .2);
  margin: auto;
  margin-top: 2em;
}

.lookup_search {
  display: flex;
  justify-content: space-between;
}

.lookup_input {
  border: 3px solid rgb(255, 255, 255);
  padding: 1em;
  /*width: 60%;*/
  flex: 8;
  margin-right: 1em;
}

.lookup_button {
  font-weight: bold;
  border: 3px solid $main-color;
  background: rgba(255, 255, 255, 0);
  flex: 4;
  text-transform: uppercase;
  color: $main-color;
  cursor: pointer;
}

input[type=text].lookup_input {
  background: rgba(0, 0, 0, 0);
  color: $main-color;
  font-size: 1em;
  &::placeholder {
    color: rgba(255, 255, 255, .6);
  }
}

.lookup_heading {
  color: $main-color;
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: .7em;
} // use this to hide the scrollbar
 ::-webkit-scrollbar {
  display: none;
}

.settings {
  display: flex;
  justify-content: flex-end;
  margin-top: .3em;
  font-size: .8em;
  span {
    margin-left: .5em;
    color: $main-color;
    a {
      color: $main-color;
      text-decoration: none;
      &:hover {
        color: darken($background-color, 50);
      }
    }
  }
}


/* Sweep To Right */

.hvr-sweep-to-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.hvr-sweep-to-right:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.hvr-sweep-to-right:hover,
.hvr-sweep-to-right:focus,
.hvr-sweep-to-right:active {
  color: $background-color;
}

.hvr-sweep-to-right:hover:before,
.hvr-sweep-to-right:focus:before,
.hvr-sweep-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.sk-folding-cube {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}

.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}

.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}

.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

@-webkit-keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

.utilities {
  position: absolute;
  padding: 3px;
  top:0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

.reposition {
  // font-size: 1.5rem;
  line-height: 1;
  color: $main-color; // font-weight: bold;
  -webkit-app-region: drag;
  -webkit-cursor: move;
  cursor: move;
  user-select: none;
}

.poweroff {
  margin-left: .13em;
  // font-size: 1.5 rem;
  line-height: 1;
}

.icon {
  display: inline-block;
  width: .8em;
  height: .8em;
  stroke-width: 0;
  stroke: $main-color;
  fill: $main-color;
}

.icon.icon-switch {
  width: 1em;
  height: 1em;
  cursor: pointer;
}

}


</style>
