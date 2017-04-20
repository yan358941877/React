import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import UserDialog from "./UserDialog";
import {getCurrentUser} from './leanCloud';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getCurrentUser()|| {},
            todoItemList :  []
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
                id: idGenerator(),
                content: value,
                finish: false,
                deleted: false
            });       
            this.setState({
                todoItemList: this.state.todoItemList
            });
        }
    }
    handlerFinishChange(event, todo){
        todo.finish = !todo.finish;
        
        this.setState({
            todoItemList: this.state.todoItemList
        });
    }
    handlerDeleteItem(event, todo){
        todo.deleted = !todo.deleted;
        
        this.setState({
            todoItemList: this.state.todoItemList
        });
    }
    // 当注册成功时
    onSignUp(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        console.log(user);
        this.setState(stateCopy);
    }
    render() {
        const context = this;
        const todos = this.state.todoItemList.map(function(item,index){
            if(item.deleted === false){
                return (        
                    <TodoItem key={item.id} 
                        todo={item}
                        finishChange={context.handlerFinishChange}
                        deleteItem={context.handlerDeleteItem}/>
                    );
            }
        })
        
        return (
            <div className="TodoApp">  
                <h2>{this.state.user.username|| "我"}的待办事项</h2>
                <TodoInput keyPress={this.handlerKeyPress}/>
                <ul>
                    {todos}
                </ul>
                {this.state.user.id?null: <UserDialog onSign={this.onSignUp.bind(this)}/>}
            </div>
        )
    }
}
let id = 0;
function idGenerator(){
    return id++;
}
export default TodoApp;