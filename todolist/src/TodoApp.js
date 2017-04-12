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
    render() {
        const context = this;
        const todos = this.state.todoItemList.map(function(item,index){
            if(item.deleted == false){
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