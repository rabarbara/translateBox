<template>
  <div id="settings" class="settings_container">

    <h1 class="settings_heading">Settings</h1>

    <div class="input-form" v-if="keys.length === 0">
      <div class="input-form-container">
        <div class="">

          <div class="input-elements">
            <p class="notification">You require an api key from <a href="https://www.dictionary.com">Merriam-Webster's Dictionary Api</a> for the
              TranslateBox to work properly.</p>


            <select v-model="apiKey.type">
    <option >Medical</option>
    <option>Collegiate</option>
  </select>

            <input type="text" v-model="apiKey.value" placeholder="Paste your api key here" @keypress.enter="inputApiKey()">
            <button
              @click="inputApiKey()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="apiKey">
        <h2>Activated keys</h2>
        <ul v-for="(key, index) in keys" :key="key.id" class="keys">
          <li>
            {{key.type}}<button @click="deleteApiKey(index)">X</button>
          </li>
        </ul>

      </div>
    </div>

    <router-link to="/">
      <button class="lookup_button">Back</button>
    </router-link>

  </div>
</template>


<script>
import electron from 'electron'
export default {
  name: 'settings',
  data () {
    return {
      apiKey: {
        type: '',
        value: ''
      },
      print: '',
      keys: [],
      settings: electron.remote.require('electron-settings')
    }
  },
  computed: {
  },
  methods: {
    inputApiKey () {
      this.settings.set(this.apiKey.type, this.apiKey.value)
      this.keys.push({type: this.apiKey.type, value: this.apiKey.value})
      this.apiKey.type = ''
      this.apiKey.value = ''
    },
    deleteApiKey (index) {
      this.keys.splice(index, 1)
      this.settings.delete(this.keys[index].type)
    },
    displays () {
      this.print = this.settings.getAll()
    }
  },
  created () {
    if (this.settings.get('medical')) {
      this.keys.push({type: 'medical', value: this.settings.get('medical')})
    }
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



  li {
    margin: .5em 0;

  }
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
</style>
