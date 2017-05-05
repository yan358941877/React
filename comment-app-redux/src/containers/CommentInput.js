import React, {Component} from 'react'
import CommentInput from '../components/CommentInput'
import {connect} from 'react-redux'
import {addComment} from '../reducers/comments'

class CommentInputContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
    }

    componentWillMount(){
        
        this._loadUsername()
    }
    _loadUsername(){
        let username = localStorage.getItem('username')||''
        this.setState({username})
    }
    _saveUsername(username){
        localStorage.setItem("username", username)
    }
    handleSubmit(comment){
        if(!comment) return 
        if(!comment.username) return alert('请输入用户名')
        if(!comment.content) return alert('请输入评论内容')
        console.log(comment)
        // 当提交成功时，将新加的comment添加到localStorage中
        const {comments} = this.props
        let newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        // 使用dispatch去修改state
        if(this.props.onSubmit){
            this.props.onSubmit(comment)
        }
    }
    render(){
        return (
            <CommentInput 
                username={this.state.username}
                onSubmit={this.handleSubmit.bind(this)}
                onUsernameBlur={this._saveUsername.bind(this)}/>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onSubmit: (comment)=>{
            dispatch(addComment(comment))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)