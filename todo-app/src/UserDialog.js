import React, {Component} from 'react'
import './UserDialog.css'
class UserDialog extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            login: true
        }
    }
    handleChangeOperate(event){
        if(event.target.value ==='login'){
            this.setState({
                login: true
            })
        }else if(event.target.value === 'signup'){
            this.setState({
                login: false
            })
        }
    }
    handleChangeUsername(event){
        this.setState({
            username: event.target.value
        })
    }
    handleChangePass(event){
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit(event){
        if(!this.state.username){
            return alert("请输入用户名")
        }
        if(!this.state.password){
            return alert("请输入密码")
        }
        if(this.state.login){
            // alert(this.state.username)
            this.props.onSubmit(this.state)
        }else {
            //alert(this.state.password)
            this.props.onSubmit(this.state)
        }
    }
    render(){
        return (
            <div className='UserDialog'>
                <div className="dialog-panel">
                    <div className='user-operate' onChange={this.handleChangeOperate.bind(this)}>
                        <input 
                            type="radio" 
                            name="operate" 
                            id="login" 
                            checked={this.state.login}
                            value="login"/>
                        <label htmlFor="login">登录</label>
                        <input 
                            type="radio" 
                            name="operate" 
                            id="signup"
                            checked={!this.state.login}
                            value="signup"/>
                        <label htmlFor="signup">注册</label>
                    </div>
                    <div className="user-info">
                        <span>用户名</span>
                        <input type="text" onChange={this.handleChangeUsername.bind(this)}/>
                    </div>
                    <div className="user-info">
                        <span>密码</span>
                        <input type="password" onChange={this.handleChangePass.bind(this)}/>
                    </div>
                    <div className="user-submit">
                        <button onClick={this.handleSubmit.bind(this)}>{this.state.login?'登录':'注册'}</button>
                    </div>
                </div>
            </div>    
        )
    }
}

export default UserDialog