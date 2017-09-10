<template>
  <div id="settings" class="settings_container">
    <h1 class="settings_heading">Settings</h1>
    <div class="input-form" v-if="keys.length === 0">
      <div class="input-form-container">
        <div class="">
          <div class="input-elements">
            <p class="notification">You require an api key from
              <a href="https://www.dictionary.com">Merriam-Webster's Dictionary Api</a> for the TranslateBox to work properly.</p>
            <div class="apikey_container">
              <select v-model="apiKey.type"
  :class="{warning:missingSelect}"
>

  <option selected value="" disabled>Choose key</option>

                <option>Medical</option>
                <option>Collegiate</option>
              </select>
              <input class="input-api" type="text" v-model="apiKey.value" placeholder="Paste your api key here and press enter" @keypress.enter="inputApiKey()">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="apiKey">
        <h2>Activated keys</h2>
        <ul v-for="(key, index) in keys" :key="key.id" class="keys">
          <li class="key">
            <span>
  {{key.type}}
</span>
            <button @click="deleteApiKey(index)">X</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="back">
      <router-link to="/">
        <button class="lookup_button">Back</button>
      </router-link>
      <div class="additional-keys" v-if="apiKeyList.length > 0 && keys.length > 0">
        <p>Want to add additional keys?</p>
        <div class="apikey_container">
          <select v-model="apiKey.type" :class="{warning:missingSelect}" aria-placeholder="asdf">
            <option selected value="" disabled>Choose key</option>
            <option v-for="(type, index) in apiKeyList" :key="type.id">{{type}}</option>
          </select>
          <input class="input-api" type="text" v-model="apiKey.value" placeholder="Paste your api key here and press enter" @keypress.enter="inputApiKey()">
        </div>
      </div>
    </div>
  </div>

</template>



<script>
import _ from 'lodash'
export default {
  name: 'settings',
  data () {
    return {
      apiKey: {
        type: '',
        value: ''
      },
      apiKeyType: '',
      apiKeyList: ['Medical', 'Collegiate'],
      print: '',
      keys: [],
      missingSelect: false
    }
  },
  computed: {
  },
  methods: {
    inputApiKey () {
      let settings = require('electron').remote.require('electron-settings')
      if (this.apiKey.type) {
        settings.set(`apiKeys.${this.apiKey.type}`, this.apiKey.value)
        this.keys.push({ type: this.apiKey.type, value: this.apiKey.value })
        this.apiKeyList.splice(this.apiKeyList.indexOf(this.apiKey.type), 1)
        this.apiKey.type = ''
        this.apiKey.value = ''
        this.missingSelect = false
      } else {
        this.missingSelect = true
      }
    },
    deleteApiKey (index) {
      let settings = require('electron').remote.require('electron-settings')
      settings.delete(`apiKeys.${this.keys[index].type}`)
      this.apiKeyList.push(this.keys[index].type)
      this.keys.splice(index, 1)
    },
    displays () {
      let settings = require('electron').remote.require('electron-settings')
      this.print = settings.getAll()
    }
  },
  mounted () {
    let settings = require('electron').remote.require('electron-settings')
    let apiKeyList = ['Medical', 'Collegiate']
    let allApiKeys = settings.get('apiKeys')
    let remaining = _.difference(apiKeyList, Object.keys(allApiKeys))
    this.apiKeyList = remaining
    let keys = []
    for (let key in allApiKeys) {
      keys.push({ type: key, value: allApiKeys[key] })
    }
    this.keys = keys
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

ul.keys {



  li.key {
    margin: 1em 0;
    color: $main-color;
    display: flex;
    justify-content: flex-start;
    font-size: 1rem;
    span {
        font-size: 1.3rem;
    }
  }

  button {
    margin-left: 20px;
    line-height: 1;
    padding: 3px;
    color: $background-color;
    // background: rgba(0,0,0,0);
    background: $main-color;
    border: 2px solid $main-color;
    // padding: 5px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;


  }
}

.input {
  background-color: $background-color;
  border: 3px solid $main-color;
  padding: 1em;
  color: $main-color;
  font-size: 1em;
}

.input-form-container {
  display: flex;
  justify-content: flex-start; // align-items: center;
  &>div {
    // margin-top: 1em;
    margin-left: 2em;
    padding: 10px;
  }
  input {
    @extend .input;
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
    color: $main-color;
    // text-decoration: none;
  }
p.notification {
  margin-bottom: 2rem;

}

.settings_container {
  padding: 10px;
}
.apikey_container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  select {
    height: 80%;
  }

  .input-api {
    width: 100%;
    margin-left: 1em;
    @extend .input;
  }
}

.back {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;

  .apikey_container {
    @extend .apikey_container;
    input {
      @extend .input;
      padding: 3px;
    }
    select {
      @extend select;
      font-size: .8rem;
      padding: 1px;
      option {
        font-size:.8rem;
        padding: 0;
      }
    }
  }
}

select.warning {
 @extend select;

border: 3px solid red;

}



</style>
