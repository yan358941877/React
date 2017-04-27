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

export function login(username, password, onSuccess, onError) {
    AV.User.logIn(username, password).then(function (loginedUser) {
        let id = loginedUser.id
        let user_id = loginedUser.attributes.user_id
        let query = new AV.Query('TodoList')
        query.equalTo('user_id', user_id)
        query.find().then(function (results) {
            //console.log(results[0].attributes.todolist)
            let todolist = results[0].attributes.todolist
            onSuccess(username, todolist)
        }, onError)
        //console.log(loginedUser)
    }, onError)
}

export function signup(username, password, onSuccess, onError) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then(function (loginedUser) {
        let id = loginedUser.id
        let user_id = loginedUser.attributes.user_id
        let todolist = []

        let TodoObject = AV.Object.extend('TodoList')
        let todoObject = new TodoObject();
        todoObject.set('user_id', user_id)
        todoObject.set('todolist', [])
        todoObject.save().then(function () {
            onSuccess(username)
        }, onError);

    }, onError)
}

export function getCurrentUser(){
    let user = AV.User.current()
    if(!user){
        return 
    }else {
        return user.attributes.username
    }
}
export function getCurrentInfo(onSuccess) {
    let user = AV.User.current()
    // 如果本地缓存是空的，则直接返回
    if(!user){
        return
    }
    let id = user.id
    let username = user.attributes.username
    let user_id = user.attributes.user_id

    let query = new AV.Query('TodoList')
    query.equalTo('user_id', user_id)
    query.find().then(function (results) {
        //console.log(results[0].attributes.todolist)
        let todolist = results[0].attributes.todolist
        onSuccess(username, todolist)
    }, function(error){

    })
}