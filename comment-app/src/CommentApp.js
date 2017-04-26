import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
    constructor(){
        super();
        this.state = {
            comments: []
        }
    }
    handleSubmitComment(comment){
        //console.log(comment);
        let comments = JSON.parse(JSON.stringify(this.state.comments));
        comments.push(comment);
        this.setState({
            comments: comments
        });
    }
    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList comments={this.state.comments}/>
            </div>
        )
    }
}

export default CommentApp