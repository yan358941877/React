import React, {Component} from 'react'
import Todo from './Todo'
class TodoList extends Component {
    render(){
        let todolist = this.props.todolist

        return (
            <div className='TodoList'>
                {todolist.map((todo,index)=><Todo todo={todo} key={index} index={index} />)}
            </div>
        )
    }
}
export default TodoList