import React, {Component} from 'react'

class CommentList extends Component {
    constructor(){
        super()
    }
    render(){
        let comments = this.props.comments

        return (
            <div>{comments.map((comment,index)=>{
                return (
                    <div key={index}>
                        {comment.username}: {comment.content}
                    </div>
                )
                })}</div>
        )
    }
}

export default CommentList