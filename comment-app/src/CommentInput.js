import React, {Component} from 'react'

class CommentInput extends Component{
    // 组件参数验证，指定props中的onSubmit的类型为函数类型
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            username: '',
            content: ''
        }
    }
    componentDidMount(){
        this.textarea.focus()
    }
    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event){
        // 先判断在props中是否存在由父级组件传来的回掉函数
        if(this.props.onSubmit){
            const {username, content} = this.state
            this.props.onSubmit({username, content})
        }
        this.setState({
            content: ''
        })
    }
    render(){
        return (
            <div className='comment-input'>
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input 
                            type="text" 
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea 
                            ref={(textarea)=>this.textarea=textarea}
                            onChange={this.handleContentChange.bind(this)} 
                            value={this.state.content}/>  
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput