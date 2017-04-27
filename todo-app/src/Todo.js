import React, {Component} from 'react'

class Todo extends Component {
    render(){
        return (
            <div className='Todo'>
                {this.props.todo.content}
            </div>
        )
    }
}

export default Todo