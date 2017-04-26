import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
    constructor(){
        super()
    }
    render(){
        let comments = this.props.comments

        return (
            <div>{comments.map((comment,index)=>{
                return (
                    <Comment comment={comment} key={index}/>
                )
                })}</div>
        )
    }
}

export default CommentList