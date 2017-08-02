import xmltransform from '@/xmltransform'

describe('xmltransform', () => {
  const xmlExample = `<?xml version="1.0" encoding="utf-8" ?><entry_list version="1.0"><entry id="intern[1]"><ew>intern</ew> <hw>in&#xB7;tern</hw> <vr><vl>also</vl> <va>in&#xB7;terne</va> <pr>ˈin-ˌtərn</pr><sound><wav>intern01.wav</wav><wpr>!in-+turn</wpr></sound></vr> <fl>noun</fl> <def><sensb><sens><dt>a physician gaining supervised practical experience in a hospital after graduating from medical school <ca>called also <cat>houseman</cat></ca></dt></sens></sensb></def></entry><entry id="intern[2]"><ew>intern</ew> <hw>in&#xB7;tern</hw> <pr>ˈin-ˌtərn</pr><sound><wav>intern01.wav</wav><wpr>!in-+turn</wpr></sound> <fl>intransitive verb</fl> <def><sensb><sens><dt>to act as an intern</dt></sens></sensb></def></entry><entry id="interne"><ew>interne</ew> <hw>interne</hw> <ahw>interneship</ahw> <cx><cl>variant of</cl> <ct>INTERN</ct> <ct>INTERNSHIP</ct></cx></entry></entry_list>`
  let x = xmltransform
  it('should receive an xml string and return a javascript object', () => {
    expect(x(xmlExample)).to.be.an('array')
    expect(x(xmlExample)[0]).to.have.property('name')
    expect(x(xmlExample)[0]).to.have.property('definitions')
    expect(x(xmlExample)[0]).to.have.property('alternative')
    expect(x(xmlExample)[0]).to.have.property('wordType')
  })

  it('should have elements where each has a definition array', () => {
    expect(x(xmlExample)[0].definitions).to.be.an('array')
    expect(x(xmlExample)[0].definitions[0]).to.be.an('array')
  })

  it('should have the definitions array where the each definition has a set of reqs', () => {
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('calledAlso')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('meaning')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('meaning')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('wholeDefinition')
  })

  it('should have the definitions array where the each definition has a set of reqs', () => {
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('calledAlso')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('meaning')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('meaning')
    expect(x(xmlExample)[0].definitions[0][0]).to.have.property('wholeDefinition')
  })
})
