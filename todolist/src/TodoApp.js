import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItemList : []
        }
        this.handlerKeyPress = this.handlerKeyPress.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
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
    render() {
        const todos = this.state.todoItemList.map(function(item,index){
            return (        
                <TodoItem key={item.id} content={item.content} finish={item.finish} deleted={item.deleted}/>
            );
        })
        return (
            <div className="TodoApp">  
                <h2>待办事项</h2>
                <TodoInput keyPress={this.handlerKeyPress}/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}
let id = 0;
function idGenerator(){
    return id++;
}
export default TodoApp;