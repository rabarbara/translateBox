<template>
  <div id="content" >
    <div v-bind:class="{hide:hide, displayExplanation:hide}">

  <div v-if="suggestion">
    <div class="card">
      <p class="entryWord">Did you mean?</p>

      <p v-for="suggestion in entries" :key="suggestion.id" @click="$emit('followUp', suggestion)" class="suggestion">
       <span class="cross-reference"> {{suggestion}}</span>
      </p>
    </div>
  </div><div v-else-if="entries.length > 0">
  <div v-for="entry in entries" :key="entry.id" class="card">
    <p class="entryWord">{{entry.name}}</p>
    <div class="explanations">
      <div class="explanation" v-for="definition in entry.definitions" :key="definition.id">
        <div class="single-definition" v-for="singleDef in definition" :key="singleDef.id">
          <p>
            <span class="number" v-if="singleDef.number">{{singleDef.number}}</span>
            <span class="text" v-for="text in singleDef.meaning" :key="text.id">
              <span v-if="text.text">{{text.text}}</span>
              <span v-if="text.it" class="special">{{text.it}}</span>
              <span v-if="text.un">{{text.un}}</span>
              <span v-if="text.sx" @click="$emit('followUp', text.sx)">See:
                <span class="cross-reference">{{text.sx}}</span>
              </span>
            </span>
            <span v-if="singleDef.calledAlso.length > 0" class="called-also"> – Called also</span>
            <span class="called-also" v-for="ca in singleDef.calledAlso" :key="ca.id">
              <span v-if="ca" @click="$emit('followUp', ca)" class="cross-reference">{{ca}}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div><div v-else>

  <div class="card">
    <p class="entryWord">There is nothing here ...</p>


  </div>

    </div>


    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import xmltransfrom from '@/xmltransform'

  export default {
    name: 'explanations',
    // components: { SystemInformation },
    props: ['explanation', 'displayExplanation'],
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      entries () {
        if (this.hide) return {}
        return xmltransfrom(this.explanation)
      },
      hide () {
        return _.isEmpty(this.explanation)
      },
      suggestion () {
        if (this.entries.length > 0 && this.entries[0].name) {
          return false
        } else if (this.entries.length === 0) {
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  $white: white;
  $main-color: rgb(117, 169, 255);
  $text: #555;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  .called-also {
    font-size: .8em;
    font-style: italic;
  }
  #content {
    /*padding: 10px;*/
    padding-top: 10px;
  }
  .hide {
    display:none;
  }
  .entryWord {
    color: $text;
    font-weight: bold;
    /*margin: 1em 0;*/
    font-size: 1.6em;
    text-transform:capitalize;
    border-bottom: 3px solid $text;
    padding-bottom: 5px;
  }
  .special {
    font-style: italic;
  }
  span.number {
    font-weight: bold;
    font-size: 1.5em;
    margin-right: .3em;
  }
  span.number::after {
    content:':';
    color: rgba(0,0,0,.2);
    margin-left:.2em;
  }
  div.single-definition {
    margin-top: 1.3em;
  }
  span.cross-reference {
    position:relative;
    color: $text;
    cursor: pointer;
    margin-left:.2em;
    font-size: 1.2em;
    border-bottom: 3px solid $text;
    padding-bottom: 0;
    text-transform: uppercase;

    &:hover {
      border-bottom: 0px solid $text;
      color: darken($main-color, 20);
    }
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -3px;
      left: 0;
      background-color: darken($main-color, 20);
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover::before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform-origin: left left;
      transform: scaleX(1);
    }
  }

  .explanations {
    padding-left: 10px;
  }
  .card {
    border: 3px solid #555;
    background: white;
    padding: 10px;
    margin-top:1em;
    color: #555;
    font-size: 1.2em;
  }

  .suggestion {
    margin-top: .7rem;
  }
</style>
