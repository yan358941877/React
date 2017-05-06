import React from 'react'

class C extends React.Component {
    changeUserInfo(){
        if(this.props.actions.login){
            this.props.actions.login({
                userid: '123',
                city: 'nanjing'
            })
        }
    }
    render(){
        return (
            <div>
                <button onClick={this.changeUserInfo.bind(this)}>修改</button>
            </div>
        )
    }
}

export default C