import AV from 'leancloud-storage'

const APP_ID = 'xnoxEOIdaxodpL5tyYXJ8ycp-gzGzoHsz'
const APP_KEY = 'THpwgGcr0RImlTlQgV1htgpv'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV

export function test() {
    let TestObject = AV.Object.extend('TestObject')
    let testObject = new TestObject()
    testObject.save({
        words: 'Hello World!'
    }).then(function (object) {
        alert('leanCloud Rocks!')
    })
}
