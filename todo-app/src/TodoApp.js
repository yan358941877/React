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
        if(!content){
            return 
        }
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

    handleDeleteTodo(index){
        let todolist = JSON.parse(JSON.stringify(this.state.todolist))
        todolist.splice(index, 1)
        this.setState({
            todolist: todolist
        })
    }

    handleFinishTodo(index){
        let todolist = JSON.parse(JSON.stringify(this.state.todolist))
        todolist[index].finish = true;
        this.setState({
            todolist: todolist
        })
    }
    render(){
        return (
            <div className='TodoApp'>
                <TodoInput onSubmit={this.handleAddTodo.bind(this)}/>
                <TodoList 
                    todolist={this.state.todolist} 
                    onDelete={this.handleDeleteTodo.bind(this)}
                    onFinish={this.handleFinishTodo.bind(this)}/>
            </div>
        )
    }
}

export default TodoApp