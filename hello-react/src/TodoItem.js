import React from 'react';

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    render() {
        return (
            <li className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status==='completed'} onChange={this.toggle}/>
                {this.props.todo.title}
                <span>删除</span>
            </li>
        )
    }

    toggle(e){
        this.props.onToggle(e, this.props.todo);
    }
}

export default TodoItem;