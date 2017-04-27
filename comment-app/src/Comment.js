import React, {Component} from 'react'

class Comment extends Component {
    constructor(){
        super()
        this.state = {timeString: ''}
    }
    _updateTimeString(){
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createTime)/1000
        this.setState({
            timeString: duration > 60
            ? `${Math.round(duration/60)} 分钟前`
            : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }
    componentWillMount(){
        this._updateTimeString()
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }
    componentWillUnmount(){
        clearInterval(this._timer)
    }
    render(){
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>
                </div>
                <p>{this.props.comment.content}</p>
                <span className='comment-createtime'>
                    {this.state.timeString}
                </span>
            </div>
        )
    }
}

export default Comment