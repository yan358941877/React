import React from "react";
import TodoInput from "./TodoInput";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="TodoApp">  
                <h2>待办事项</h2>
                <TodoInput />
                <ul>
                    {}
                </ul>
            </div>
        )
    }
}

export default TodoApp;