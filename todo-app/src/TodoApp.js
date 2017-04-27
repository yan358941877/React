import React, {Component} from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import {getCurrentInfo,getCurrentUser,updateTodo,test2} from './leanCloud'
import UserDialog from './UserDialog'

class TodoApp extends Component {
    constructor(){
        super()
        this.state = {
            username: getCurrentUser(),
            todolist: []
        }
        this._setState = this._setState.bind(this)
    }

    _saveTodo(todolist){
        localStorage.setItem('todolist', JSON.stringify(todolist))
    }
    _loadTodo(){
        let todolist = localStorage.getItem('todolist')
        todolist = JSON.parse(todolist)
        return todolist
    }
    _setState(username, todolist){
        this.setState({
            username: username,
            todolist: todolist
        })
    }
    componentWillMount(){
        getCurrentInfo(this._setState)
        
    }
    componentDidUpdate(){
        updateTodo(this.state.todolist)
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

    handleFinishTodo(index, isFinish){
        
        let todolist = JSON.parse(JSON.stringify(this.state.todolist))
        if(isFinish){
            todolist[index].finish = true;
        }else{
            todolist[index].finish = false;
        }
        
        this.setState({
            todolist: todolist
        })
    }

    handleLogin(username, todolist){
        this.setState({
            username: username,
            todolist: todolist
        })
    }
    handleSignup(username){
        this.setState({
            username: username,
            todolist: []
        })
    }
    render(){
        let dialog = <UserDialog onLogin={this.handleLogin.bind(this)} onSignup={this.handleSignup.bind(this)}/>
        return (
            <div className='TodoApp'>
                <TodoInput onSubmit={this.handleAddTodo.bind(this)} username={this.state.username}/>
                <TodoList 
                    todolist={this.state.todolist} 
                    onDelete={this.handleDeleteTodo.bind(this)}
                    onFinish={this.handleFinishTodo.bind(this)}/>
                {this.state.username?null:dialog}
            </div>
        )
    }
}

export default TodoApp