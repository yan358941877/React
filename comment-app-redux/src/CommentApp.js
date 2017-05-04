import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Comment from './Comment'

class CommentApp extends React.Component {
    constructor(){
        super()
        this.state = {
            comments: []
        }
    }
    _saveComments(comments){
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    _loadComments(){
        let comments = JSON.parse(localStorage.getItem('comments'))
        this.setState({
            comments: comments||[]
        })
    }
    componentWillMount(){
        this._loadComments()
    }
    handleSubmitContent(comment){
        if(!comment) return 
        if(!comment.username) return alert('请输入用户名')
        if(!comment.content) return alert('请输入评论内容')
        let comments = JSON.parse(JSON.stringify(this.state.comments))
        comments.push(comment)
        this.setState({
            comments: comments
        })
        this._saveComments(comments)
    }
    handleDeleteComment(index){
        let comments = JSON.parse(JSON.stringify(this.state.comments))
        comments.splice(index, 1)
        this.setState({
            comments: comments
        })
        this._saveComments(comments)
    }
    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitContent.bind(this)}/>
                <CommentList 
                    comments={this.state.comments} 
                    onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )

    }
}

export default CommentApp