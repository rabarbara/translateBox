import xmltransform from '@/xmltransform'

describe('xmltransform', () => {
  it('should receive an xml string and return a javascript object', () => {
    const xmlExample = `<?xml version="1.0" encoding="utf-8" ?><entry_list version="1.0"><entry id="intern[1]"><ew>intern</ew> <hw>in&#xB7;tern</hw> <vr><vl>also</vl> <va>in&#xB7;terne</va> <pr>ˈin-ˌtərn</pr><sound><wav>intern01.wav</wav><wpr>!in-+turn</wpr></sound></vr> <fl>noun</fl> <def><sensb><sens><dt>a physician gaining supervised practical experience in a hospital after graduating from medical school <ca>called also <cat>houseman</cat></ca></dt></sens></sensb></def></entry><entry id="intern[2]"><ew>intern</ew> <hw>in&#xB7;tern</hw> <pr>ˈin-ˌtərn</pr><sound><wav>intern01.wav</wav><wpr>!in-+turn</wpr></sound> <fl>intransitive verb</fl> <def><sensb><sens><dt>to act as an intern</dt></sens></sensb></def></entry><entry id="interne"><ew>interne</ew> <hw>interne</hw> <ahw>interneship</ahw> <cx><cl>variant of</cl> <ct>INTERN</ct> <ct>INTERNSHIP</ct></cx></entry></entry_list>`

    let x = xmltransform.xmltransform
    expect(x(xmlExample)).to.be.a('array')
    // expect(x(xmlexample)).to.have
  })
})
