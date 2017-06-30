<template>
  <div id="wrapper" >
    <div v-bind:class="{hide:hide}">
      
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'explanations',
    // components: { SystemInformation },
    props: ['explanation'],
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      entries () {
        if (_.isEmpty(this.explanation)) return {}
        let items = this.explanation.entry_list.entry
        let rearranged = items.map(item => {
          return {
            entryWord: item.ew[0], // main word
            definitions: item.def, // all definitions
            wordType: item.fl // noun, verb ...
          }
        })
        .map(item => {
          let definitions = item.definitions.map(value => {
            return value.sensb
          })
          .reduce((a, b) => {
            return a.concat(b)
          }, [])
          .map(def => {
            return def.sens
          })
          item.definitions = definitions
          return item
        })
        return rearranged
      },
      hide () {
        return _.isEmpty(this.explanation)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  #wrapper {
    background: rgba(0, 0, 0, .2);
  }
  .hide {
    display:none;
  }
  h1 {
    color: rgb(15, 119, 160);
  }
 
</style>
