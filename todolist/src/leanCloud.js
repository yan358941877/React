import AV from 'leancloud-storage'

var APP_ID = 'xnoxEOIdaxodpL5tyYXJ8ycp-gzGzoHsz';
var APP_KEY = 'THpwgGcr0RImlTlQgV1htgpv';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;

export function signUp(username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);
    // 获取用户信息
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        let user_id = user.user_id;
        //let todolist = loginedUser.attributes.todolist;
        var TodoList = AV.Object.extend('TodoList');
        // 新建对象
        var todoList = new TodoList();
        // 设置名称
        todoList.set('user_id', user_id);

        todoList.save().then(function (todo) {
            
        }, function (error) {
            console.error(error);
        });
        successFn.call(null, user, []);
    }, errorFn);

}
export function signIn(username, password, successFn, errorFn) {
    // 当用户登录时，从TodoList表中查找相关当前用户的todolist
    AV.User.logIn(username, password).then(function (loginedUser) {
        //console.log(loginedUser.attributes.todolist);

        let user = getUserFromAVUser(loginedUser);
        // 获取用户id
        let user_id = user.user_id;
        // 建立查询
        let query = new AV.Query('TodoList');
        // 设定查询条件
        query.equalTo('user_id', user_id);
        // 进行查询
        query.find().then(function (result) {
            // 得到的result是一个满足条件的多个实例的数组，由于设定的用户id是唯一的，因此直接取第一个
            // 如果得到的todolist是undefined，说明TodoList表中没有该用户的信息，即该用户还没有输入过 待做事项
            if (!result[0]) {
                successFn.call(null, user, []);
            } else {
                successFn.call(null, user, result[0].attributes.todolist);
            }
        }, function (error) {
        });
    }, function (error) {
        errorFn.call(null, error)
    });

    // let user = getCurrentUser();
    // let user_id = user.user_id;
    // let query = new AV.Query('TodoList');
    // query.equalTo('user_id', user_id);
    // query.find().then(function (result) {
    //     if (!result[0]) {
    //         successFn.call(null, user, []);
    //     } else {
    //         successFn.call(null, user, result[0].attributes.todolist);
    //     }
    //     //console.log(result);
    // }, function (error) {
    // });
}
// 获取当前用户信息
export function getCurrentUser() {

    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}
// _User表中的信息都存放在 user.attributes中，这个是 解构赋值？？
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}
/*
export function getCurrentTodo(user_id) {
    
    let query = new AV.Query('TodoList');
    query.equalTo('user_id', user_id);
    query.find().then(function (results) {
        console.log(results);
    }, function (error) {
    });
}
*/
// 获取当前用户的TodoList
export function getCurrentTodo(successFn) {
    // 获取当前user
    let user = getCurrentUser();
    if (!user) {
        return [];
    }
    let user_id = user.user_id;
    // 建立查找
    let query = new AV.Query('TodoList');
    // 设定查找条件
    query.equalTo('user_id', user_id);
    // 开始查找
    query.find().then(function (result) {
        // 这里的successFn指的是TodoList.js中的getTodoList方法，用来setState
        if (!result[0]) {
            successFn.call(null, []);
        } else {
            successFn.call(null, result[0].attributes.todolist);
        }
        //console.log(result);
    }, function (error) {
    });
}


// 当用户输入了新的todoItem，点击完成了按钮，删除了todoItem，对数据库中的TodoList表进行修改
export function updateTodo(newtodolist) {
    // 首先查找到与当前用户对应的 在TodoList表中的实例
    let user = getCurrentUser();
    // 获取当前用户的id值
    let user_id = user.user_id;
    // 建立查询
    let query = new AV.Query('TodoList');
    // 设定查询条件
    query.equalTo('user_id', user_id);
    // 进行查询
    query.find().then(function (result) {
        //console.log(result[0].attributes.todolist);
        // 得到实例的id，对实例进行操作要必须获取实例的id
        let todolist_id = result[0].id;

        // 对表中的对象进行修改
        let todolist = AV.Object.createWithoutData('TodoList', todolist_id);
        // 修改属性
        todolist.set('user_id', user_id);
        todolist.set('todolist', newtodolist);
        // 保存到云端
        todolist.save({
            fetchWhenSave: true
        });
    }, function (error) {
    });

    // if (user) {
    //     let todo = AV.Object.createWithoutData('TodoList');
    //     // 修改属性
    //     todo.set()
    //     todo.set('todolist', todolist);
    //     // 保存到云端
    //     todo.save({
    //         fetchWhenSave: true
    //     });
    // }
    //console.log(user.attributes.todolist);

}
/*
// 获取当前用户的todoList信息
export function getCurrentTodo(year) {
    let user_id = getCurrentUser().user_id;
    let query = new AV.Query('DataTest');
    var todo = {};
    query.equalTo('user_id', user_id);
    query.find().then(function (results) {
        updateTodo(results[0].id,year);
    }, function (error) {
    });
}

export function updateTodo(id,year) {
    var todo = AV.Object.createWithoutData('DataTest', id);
    // 修改属性
    todo.set('testNumber', year);
    // 保存到云端
    todo.save();
}

export function insertData() {


    var number = 2014;
    var string = 'famous film name is ' + number;
    var date = new Date();
    var array = [string, number];
    var object = { number: number, string: string };

    var testObject = new TestObject();
    testObject.set('user_id', getCurrentUser().user_id);
    testObject.set('testNumber', number);
    testObject.set('testString', string);
    testObject.set('testDate', date);
    testObject.set('testArray', array);
    testObject.set('testObject', object);
    testObject.set('testNull', null);
    testObject.save().then(function (result) {
        // 成功
        console.log(result)
    }, function (error) {
        // 失败
    });
}*/