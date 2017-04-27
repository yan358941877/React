import React, {Component} from 'react'

class TodoInput extends Component{
    constructor(){
        super()
        this.state = {
            content: ''
        }
    }
    handleInputChange(event){
        let content = event.target.value
        this.setState({
            content: content
        })
    }
    handleSubmit(event){
        if(event.which === 13 && this.props.onSubmit){
            this.props.onSubmit(this.state.content)
        }
        this.setState({
            content: ''
        })
    }
    render(){
        return (
            <div className='TodoInput'>
                <h2>我的代办事项</h2>
                <input 
                    type="text" 
                    value={this.state.content}
                    onChange={this.handleInputChange.bind(this)}
                    onKeyDown={this.handleSubmit.bind(this)}/>
            </div>    
        )
    }
}

export default TodoInput