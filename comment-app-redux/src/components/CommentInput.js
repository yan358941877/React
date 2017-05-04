import React from 'react'

class CommentInput extends React.Component {
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }
    static defaultProps = {
        username: ''
    }
    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            content: ''
        }
    }
    componentDidMount() {
        this.textarea.focus()
    }
    // _saveUsername(username) {
    //     localStorage.setItem('username', username)
    // }
    // _loadUsername() {
    //     const username = localStorage.getItem('username')
    //     if (username) {
    //         this.setState({ username })
    //     }
    // }
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    handleUsernameBlur(event) {
        if (!event.target.value) {
            return
        }
        this.props.onUserNameInputBlur(event.target.value)
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event) {
        if (this.props.onSubmit) {

            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({ content: '' })
    }
    
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}
                            ref={(textarea) => this.textarea = textarea} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput