<template>
  <div id="wrapper">
      <div v-for="singleExplanation in this.explanation.entry_list.entry" v-bind:key="singleExplanation">      
        <h1>{{singleExplanation.$.id}}</h1>
        <div v-for="definition in singleExplanation.def[0].sensb" v-bind:key="definition">
          <p class="explanations" v-for="explanationString in definition.sens" v-bind:key="explanationString">{{explanationString}}</p>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'explanations',
    // components: { SystemInformation },
    props: ['explanation'],
    data () {
      return {
      }
    },
    methods: {
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
  .show {
    display:block;
  }
  h1 {
    color: rgb(15, 119, 160);
  }
 
</style>
