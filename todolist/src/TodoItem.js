import React from "react";

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handlerFinishChange = this.handlerFinishChange.bind(this);
        this.handlerClickDelete = this.handlerClickDelete.bind(this);
    }
    handlerFinishChange(event){
        this.props.finishChange(event, this.props.todo);
    }
    handlerClickDelete(event){
        this.props.deleteItem(event, this.props.todo);
    }
    render() {
        return (
            <li className="TodoItem">
                <input type="checkbox" checked={this.props.todo.finish?"checked":false} onChange={this.handlerFinishChange}/>
                {this.props.todo.content}
                <span onClick={this.handlerClickDelete}>删除</span>
            </li>
        )
    }
}

export default TodoItem;