import React from 'react'
import Comment from './Comment'

class CommentList extends React.Component {

    handleDeleteComment(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }
    render() {
        console.log(this.props.comments)
        return (
            <div>
                {this.props.comments.map(
                    (comment, i) => <Comment 
                        comment={comment} key={i} index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}/>
                )}
            </div>
        )
    }
}

export default CommentList