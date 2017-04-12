import React from "react";
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="TodoApp">  
                <h2>待办事项</h2>
                <div>
                    <input type="text"/>
                </div>
                <ul>
                    {}
                </ul>
            </div>
        )
    }
}

export default TodoApp;