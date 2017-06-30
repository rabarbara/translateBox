<template>
  <div id="wrapper" >
    <div v-bind:class="{hide:hide}">
      <div v-for="(entry, index) in entries" :key="index">
        <p class="entryWord">{{entry.name}}</p>
        <div class="explanations">
          <div class="explanation" v-for="(definition, index) in entry.definitions" :key="index">
            <div class="single-definition" v-for="(singleDef, index) in definition" :key="index">
              <p><span class="number" v-if="singleDef.number">{{singleDef.number}}</span> 
                  <span class="text" v-for="(text, index) in singleDef.meaning" :key="index">
                    <span v-if="text.text">{{text.text}}</span><span v-if="text.it" class="special">{{text.it}}</span>
                    <span v-if="text.sx" class="cross-reference" @click="$emit('followUp', text.sx)">{{text.sx}}</span>
                  </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import xmldoc from 'xmldoc'
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
        if (this.hide) return {}
        let doc = new xmldoc.XmlDocument(this.explanation)
        let entries = doc.childrenNamed('entry')
        let consumableObject = entries.map(entry => {
          // create an container object for each entry
          return {
            name: entry.childNamed('ew').val, // word name
            definitions: entry.descendantWithPath('def').children, // all container definitions
            wordType: entry.childNamed('fl').val  // word type
          }
        })
        .map(entry => {
          let defs = entry.definitions.map(sensb => {
            // iterate one step into the xml and
            return sensb.childrenNamed('sens').map(item => {
              // get the defitition items
              let inlineMeaning = item.descendantWithPath('dt').children.filter(item => {
                // this will have to be expanded
                // check if is a text node and has a text property or if the name of the xml element is 'it'. This excludes all other elements, such as <ca>
                return (item.text || item.name === 'it' || item.name === 'sx')
              })
              .map(item => {
                // create a key value relationship for the definitions so that you can create a different template element in the vue template based on the key
                if (item.text) {
                  return {'text': item.text}
                }
                let container = {}
                let name = item.name
                container[name] = item.val
                return container
              })

              let calledAlso = item.descendantWithPath('dt').children.filter(item => {
                return item.name === 'ca'
              })
              .map(term => {
                return term.childrenNamed('cat').map(x => x.val)
              })
              .reduce((a, b) => {
                return a.concat(b)
              }, [])

              return {
                number: item.valueWithPath('sn'),
                meaning: inlineMeaning,
                calledAlso: calledAlso,
                wholeDefinition: item.descendantWithPath('dt').toString().replace(/\n/g, '').replace(/<[/]?dt>/g, '').trim()
              }
            })
          })
          entry.definitions = defs
          return entry
        })
        return consumableObject
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
  .entryWord {
    color: orange;
    font-weight: bold;
    margin: 1em 0;
    font-size: 2em;
    text-transform:capitalize;
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
</style>
