import React, {Component} from 'react'

class Todo extends Component {
    render(){
        return (
            <div className='Todo'>
                <input type='checkbox' className='todo-finish'/>
                <p>{this.props.todo.content}</p>
                <span className='todo-delete'>删除</span>
            </div>
        )
    }
}

export default Todo