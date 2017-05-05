import React, {Component} from 'react'
import CommentList from '../components/CommentList'
import {connect} from 'react-redux'
import {initComments, deleteComment} from '../reducers/comments'

class CommentListContainer extends Component{

    //一开始，comments都存放在localStorage中，redux中存放的状态为空,需要从本地取出来comments然后放入redux中的state中
    componentWillMount(){
        let comments = localStorage.getItem('comments')
        comments = JSON.parse(comments)
        if(this.props.initComments){
            this.props.initComments(comments)
        }
    }
    handleDeleteComment(index){
        const {comments} = this.props.comments
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index+1)
        ]
        localStorage.setItem('comments', newComments)
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }
    render(){
        return(
            <CommentList 
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}/>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        initComments: (comments) =>{
            dispatch(initComments(comments))
        },
        onDeleteComment: (index)=> {
            dispatch(deleteComment(index))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)