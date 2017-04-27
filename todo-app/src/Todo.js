import React, { Component } from 'react'

class Todo extends Component {

    handleDeleteTodo() {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.index)
        }
    }
    handleFinishTodo() {
        if (this.props.onFinish) {
            if (!this.props.todo.finish) {
                console.log('完成了！')
                this.props.onFinish(this.props.index, true)
            }else {
                this.props.onFinish(this.props.index, false)
            }

        }
    }
    render() {
        return (
            <div className='Todo'>
                <input
                    type='checkbox'
                    className='todo-finish'
                    onChange={this.handleFinishTodo.bind(this)}
                    checked={this.props.todo.finish} />
                <p>{this.props.todo.content}</p>
                <span className='todo-delete' onClick={this.handleDeleteTodo.bind(this)}>删除</span>
            </div>
        )
    }
}

export default Todo