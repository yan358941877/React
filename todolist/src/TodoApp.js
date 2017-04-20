import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import UserDialog from "./UserDialog";
import {getCurrentUser,updateTodo,getCurrentTodo} from './leanCloud';
import {getStateCopy} from './Utils';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getCurrentUser()|| {},
            todoItemList : getCurrentTodo(this.getTodoList.bind(this)) || []
        }
        this.handlerKeyPress = this.handlerKeyPress.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.handlerDeleteItem = this.handlerDeleteItem.bind(this);
        this.handlerFinishChange = this.handlerFinishChange.bind(this);
    }
    
    handlerKeyPress(event) {
        //alert(event.which);
        if(event.which === 13){
            //alert(event.target.value);
            this.addNewItem(event.target.value);
            event.target.value="";
        }
    }
    addNewItem(value){
        if(value.length>0&&value.trim().length>0){
            this.state.todoItemList.push({
                //id: idGenerator(),
                content: value,
                finish: false,
                deleted: false
            });       
            this.setState({
                todoItemList: this.state.todoItemList
            });
            // 在此处向数据库中更新当前用户的todoList
            updateTodo(this.state.todoItemList);
        }
    }
    handlerFinishChange(event, todo){
        todo.finish = !todo.finish;
        
        this.setState({
            todoItemList: this.state.todoItemList
        });
        // 在此处向数据库中更新当前用户的todoList
        updateTodo(this.state.todoItemList);
    }
    handlerDeleteItem(event, todo){
        todo.deleted = !todo.deleted;
        
        this.setState({
            todoItemList: this.state.todoItemList
        });
        // 在此处向数据库中更新当前用户的todoList
        updateTodo(this.state.todoItemList);
    }
    // 当注册或者登录成功时
    onSign(user, todolist){
        let stateCopy = getStateCopy(this.state);
        stateCopy.user = user;
        stateCopy.todoItemList = todolist;
        this.setState(stateCopy);
    }
    getTodoList(todolist){
        let stateCopy = getStateCopy(this.state);
        stateCopy.todoItemList = todolist;
        this.setState(stateCopy);
    }
    // 退出当前账户
    handleLogOut(){
        this.setState({
            user: {},
            todoItemList :  []
        });
        localStorage.clear();
    }
    
    render() {
        const context = this;
        const todos = this.state.todoItemList.map(function(item,index){
            if(item.deleted === false){
                return (        
                    <TodoItem key={index} 
                        todo={item}
                        finishChange={context.handlerFinishChange}
                        deleteItem={context.handlerDeleteItem}/>
                    );
            }
        })
        
        return (
            <div className="TodoApp">  
                <h2>{this.state.user.username|| "我"}的待办事项</h2>
                <span className="logOut" onClick={this.handleLogOut.bind(this)}>注销</span>
                <TodoInput keyPress={this.handlerKeyPress}/>
                <ul>
                    {todos}
                </ul>
                {this.state.user.id?null: <UserDialog onSign={this.onSign.bind(this)}/>}
            </div>
        )
    }
}
let id = 0;
function idGenerator(){
    return id++;
}
export default TodoApp;