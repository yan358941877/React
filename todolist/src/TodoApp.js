import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.handlerKeyPress = this.handlerKeyPress.bind(this);
    }
    handlerKeyPress(event) {
        alert("按下了按键!");
    }
    render() {
        return (
            <div className="TodoApp">  
                <h2>待办事项</h2>
                <TodoInput keyPress={this.handlerKeyPress}/>
                <ul>
                    <TodoItem key="1"/>
                    <TodoItem key="2"/>
                </ul>
            </div>
        )
    }
}

export default TodoApp;