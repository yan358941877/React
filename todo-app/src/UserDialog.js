import React, { Component } from 'react'
import { login, signup } from './leanCloud'
import './UserDialog.css'

class UserDialog extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            login: true
        }
    }
    handleChangeOperate(event) {
        if (event.target.value === 'login') {
            this.setState({
                login: true
            })
        } else if (event.target.value === 'signup') {
            this.setState({
                login: false
            })
        }
    }
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }
    handleChangePass(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit(event) {
        if (!this.state.username) {
            return alert("请输入用户名")
        }
        if (!this.state.password) {
            return alert("请输入密码")
        }
        if (this.state.login) {
            login(this.state.username, this.state.password, this.props.onLogin, this.handleError)
        } else {
            signup(this.state.username, this.state.password, this.props.onSignup, this.handleError)
        }
    }
    handleError(error) {
        if (error.code === 202) {
            alert("该用户名已被占用，请更换用户名重新注册！");
        } else if (error.code === 210) {
            alert("用户名和密码不匹配，请重新输入！");
        } else if (error.code === 211) {
            alert("该用户不存在，请重新输入用户名");
        } else if (error.code === 216) {
            alert("用户名无效，请重新输入用户名");
        } else if (error.code === 211) {
            alert("不允许空白，请重新输入密码");
        } else {
            alert(error);
        }
    }
    render() {
        return (
            <div className='UserDialog'>
                <div className="dialog-panel">
                    <div className='user-operate' onChange={this.handleChangeOperate.bind(this)}>
                        <input
                            type="radio"
                            name="operate"
                            id="login"
                            checked={this.state.login}
                            value="login" />
                        <label htmlFor="login">登录</label>
                        <input
                            type="radio"
                            name="operate"
                            id="signup"
                            checked={!this.state.login}
                            value="signup" />
                        <label htmlFor="signup">注册</label>
                    </div>
                    <div className="user-info">
                        <span>用户名</span>
                        <input type="text" onChange={this.handleChangeUsername.bind(this)} />
                    </div>
                    <div className="user-info">
                        <span>密码</span>
                        <input type="password" onChange={this.handleChangePass.bind(this)} />
                    </div>
                    <div className="user-submit">
                        <button onClick={this.handleSubmit.bind(this)}>{this.state.login ? '登录' : '注册'}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog