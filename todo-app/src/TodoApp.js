import React, {Component} from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

class TodoApp extends Component {
    constructor(){
        super()
        this.state = {
            todolist: []
        }
    }

    handleAddTodo(content){
        let todolist = JSON.parse(JSON.stringify(this.state.todolist))
        let todo = {
            content: content,
            finish: false,
            delete: false
        }
        todolist.push(todo)
        this.setState({
            todolist: todolist
        })
    }
    render(){
        return (
            <div className='TodoApp'>
                <TodoInput onSubmit={this.handleAddTodo.bind(this)}/>
                <TodoList todolist={this.state.todolist}/>
            </div>
        )
    }
}

export default TodoApp