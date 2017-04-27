import React, { Component, PropTypes } from 'react'

class CommentInput extends Component {
    // 组件参数验证，指定props中的onSubmit的类型为函数类型
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }
    componentWillMount(){
        this._localUsername()
    }
    _localUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({
                username:username
            })
        }
    }
    componentDidMount() {
        this.textarea.focus()
    }
    /* input相关的事件处理函数 */
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    // _saveUsername作为私有方法所以以_开头
    _saveUsername(username) {
        localStorage.setItem('username', username)
    }
    handleUsernameBlur(event) {
        this._saveUsername(event.target.value);
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event) {
        // 先判断在props中是否存在由父级组件传来的回掉函数
        if (this.props.onSubmit) {
            //const { username, content } = this.state
            //this.props.onSubmit({ username, content })
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createTime: +new Date()
            })
        }
        this.setState({
            content: ''
        })
    }
    render() {
        return (
            <div className='comment-input'>
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)} />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            onChange={this.handleContentChange.bind(this)}
                            value={this.state.content} />
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