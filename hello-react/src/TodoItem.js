import React from 'react';

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
    }
    
    render() {
        return (
            <li className="TodoItem" >
                <input type="checkbox" checked={this.props.todo.status==='completed'} onChange={this.toggle}/>
                {this.props.todo.title}
                <span onClick={this.deleteSelf}>删除</span>
            </li>);
    }

    toggle(e){       
        this.props.onToggle(e, this.props.todo);
    }
    deleteSelf(e){
        this.props.onDelete(e, this.props.todo);
    }
}

export default TodoItem;