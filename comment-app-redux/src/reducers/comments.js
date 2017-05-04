const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

export default function (state, action){
    if(!state){
        state = {
            comments: []
        }
    }
    switch(action.type){
        // 从localStorage中取出对应的comments
        case INIT_COMMENTS:
            return {comments: action.comments}
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comments]
            }
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentInde),
                    ...state.comments.slice(action.commentIndex+1)
                ]
            }
        defalut:
            return state
    }
}

export const initComments = (comments)=>{
    return {type: INIT_COMMENTS, comments}
}

export const addComment = (comment)=> {
    return {type: ADD_COMMENT, comment}
}

export const deleteComment = (commentIndex)=>{
    return {type: DELETE_COMMENT, commentIndex}
}