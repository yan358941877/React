import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
    handleDeleteComment(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }
    render(){
        let comments = this.props.comments

        return (
            <div className='comment-list'>{comments.map((comment,index)=>{
                return (
                    <Comment 
                        comment={comment} 
                        key={index}
                        index={index}
                        onDeleteComment={this.handleDeleteComment.bind(this)}/>
                )
                })}</div>
        )
    }
}

export default CommentList