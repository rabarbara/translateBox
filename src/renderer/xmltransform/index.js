let xmldoc = require('xmldoc')
let _ = require('lodash')

let transformer = (xml) => {
  let doc = new xmldoc.XmlDocument(xml)
  let entries = doc.childrenNamed('entry')
  let consumableObject = entries.map(entry => {
    // create an container object for each entry
    return {
      name: _.has(entry.childNamed('ew'), 'val') ? entry.childNamed('ew').val : '', // word name
      definitions: _.has(entry.descendantWithPath('def'), 'children') ? entry.descendantWithPath('def').children : null, // all container definitions
      wordType: _.has(entry.descendantWithPath('fl'), 'val') ? entry.childNamed('fl').val : null, // word type
      alternative: _.has(entry.childNamed('ahw'), 'val') ? entry.childNamed('ahw').val : null
    }
  })
  .map(entry => {
    if (entry.definitions) {
      let defs = entry.definitions.map(sensb => {
      // iterate one step into the xml and
        return sensb.childrenNamed('sens').map(item => {
        // get the defitition items
          let inlineMeaning = item.descendantWithPath('dt').children.filter(item => {
            // this will have to be expanded
            // check if is a text node and has a text property or if the name of the xml element is 'it'. This excludes all other elements, such as <ca>
            return (item.text || item.name === 'it' || item.name === 'sx' || item.name === 'un')
          })
          .map(item => {
            // create a key value relationship for the definitions so that you can create a different template element in the vue template based on the key
            if (item.text) {
              return {
                'text': item.text
              }
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
    } else {
      entry.definitions = null
    }
    return entry
  })
  return consumableObject
}
export default transformer
