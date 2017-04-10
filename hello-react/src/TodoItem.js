import React from 'react';

class TodoItem extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <li className="TodoItem">
                <input type="checkbox" />
                {this.props.todo.title}
                <span>删除</span>
            </li>
        )
    }
}

export default TodoItem;