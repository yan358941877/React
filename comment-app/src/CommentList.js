import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
    
    render(){
        let comments = this.props.comments

        return (
            <div className='comment-list'>{comments.map((comment,index)=>{
                return (
                    <Comment comment={comment} key={index}/>
                )
                })}</div>
        )
    }
}

export default CommentList