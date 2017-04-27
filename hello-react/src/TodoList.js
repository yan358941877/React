import React, {Component} from 'react'
import Todo from './Todo'
class TodoList extends Component {
    handleDeleteTodo(index){
        if(this.props.onDelete){
            this.props.onDelete(index)
        }
    }
    handleFinishTodo(index, isFinish){
        if(this.props.onFinish){
            this.props.onFinish(index, isFinish)
        }
    }
    render(){
        let todolist = this.props.todolist

        return (
            <div className='TodoList'>
                {todolist.map(
                    (todo,index)=>(<Todo 
                        todo={todo} 
                        key={index} 
                        index={index} 
                        onDelete={this.handleDeleteTodo.bind(this)} 
                        onFinish={this.handleFinishTodo.bind(this)}/>))}
            </div>
        )
    }
}
export default TodoList