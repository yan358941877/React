import React, { Component } from 'react'

class TodoInput extends Component {
    constructor() {
        super()
        this.state = {
            content: ''
        }
    }
    componentDidMount(){
        this.input.focus()
    }
    handleInputChange(event) {
        let content = event.target.value
        this.setState({
            content: content
        })
    }
    handleSubmit(event) {
        if (event.which === 13 && this.props.onSubmit) {
            this.props.onSubmit(this.state.content)
            this.setState({
                content: ''
            })
        }

    }
    render() {
        return (
            <div className='TodoInput'>
                <h2>{this.props.username||'我'}的待办事项</h2>
                <input
                    type="text"
                    value={this.state.content}
                    onChange={this.handleInputChange.bind(this)}
                    onKeyDown={this.handleSubmit.bind(this)} 
                    ref={(input) => this.input = input}/>
            </div>
        )
    }
}

export default TodoInput