<template>
  <div id="container">
    <main>
      <div class="lookup_container">
        <h1 class="lookup_heading">What do you want to know? <button @click="resize()">Resize</button></h1>
        <div class="lookup_search">
          <input type="text" v-model="inputText" @keyup.enter="lookUp()" class="lookup_input" placeholder="Type in your word ...">
          <button @click="lookUp()" class="lookup_button hvr-sweep-to-right">Search</button>
        </div>
        <div v-if="errorMessage">Oops, something went wrong with the dictionary.
          <pre>
            {{this.errorMessage}}
          </pre>
        </div>
        <div class="spinner" v-bind:class="{hide:!spinner}">
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>
        </div>
      </div>
      <Explanations v-if="inputText" v-bind:explanation="this.explanation" v-on:followUp="followUp" v-bind:class="{hide:spinner}"></Explanations>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import credentials from '@/components/credentials/credential'
  import Explanations from '@/components/Explanations'
  import electron from 'electron'
  
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
        winProperties: {
          width: 0,
          height: 0
        }

      }
    },
    methods: {
      lookUp (term = this.inputText) {
        this.spinner = true
        let lookUpUrl = `${credentials.merriam.medical.url}${encodeURI(term.trim())}?key=${credentials.merriam.medical.key}`
        console.log(lookUpUrl)
        axios.get(lookUpUrl)
        .then(response => {
          this.spinner = false
          this.explanation = response.data
        })
      .catch(e => {
        this.error = true
        this.errorMessage = e
      })
      },
      followUp (term) {
        this.inputText = term.toLowerCase()
        return this.lookUp(term)
      },
      resize () {
        /* eslint-disable no-unused-vars */
        let {width, height} = electron.remote.screen.getPrimaryDisplay().workAreaSize
        let win = electron.remote.getCurrentWindow()
        let [contentWidth, contentHeight] = win.getContentSize()
        let [positionX, positionY] = win.getPosition()
        let extraHeight = height - positionY - 30
        win.setSize(contentWidth, extraHeight, true)
      }
    },
    created () {
      let getScreenProperties = () => {
        let win = electron.remote.getCurrentWindow()
        let [width, height] = win.getSize()
        this.winProperties.width = width
        this.winProperties.height = height
      }
      return getScreenProperties()
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    $main-color: rgb(117, 169, 255);
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body { font-family: 'Source Sans Pro', sans-serif; background: $main-color;}

  .spinner {
    margin-top:4em;
    color:white;
  }
  .hide {
    display: none;
  }
  main {
    width:90%;
    margin: 0 auto;
    max-width: 560px;
  }
  .lookup_container {
   border: 3px solid white;
   padding: 2em;
   box-shadow: .1em .1em .1em rgba(255,255,255,.2);
   margin:auto;
   margin-top:2em;

  }
  .lookup_search {
    display:flex;
    justify-content: space-between;
  }
  .lookup_input {
    border: 3px solid rgb(255, 255, 255);
    padding: 1em;
    /*width: 60%;*/
    flex:8;
    margin-right:1em;
  }
  .lookup_button {
    font-weight: bold;
    border: 3px solid white;
    background: rgba(255,255,255,0);
    flex: 4;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
  }

   input[type=text].lookup_input {
    background: rgba(0,0,0,0);
    color: white;
    font-size: 1em;
    
    &::placeholder {
      color: rgba(255,255,255,.6);
    }
  }
  .lookup_heading {
    color: white;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: .7em;
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
  .hvr-sweep-to-right:hover, .hvr-sweep-to-right:focus, .hvr-sweep-to-right:active {
    color: $main-color;
  }
  .hvr-sweep-to-right:hover:before, .hvr-sweep-to-right:focus:before, .hvr-sweep-to-right:active:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  .sk-folding-cube {
  margin: 2em auto 0 auto;
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
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  } 
}

@keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
}
</style>
