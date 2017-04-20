import React from "react";
import './UserDialog.css';
import { signUp } from './leanCloud'

class UserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
    }
    render() {
        let signUpForm = (
            <form className="signUp"> {/* 注册*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" />
                </div>
                <div className="row actions">
                    <input type="submit" value="注册"/>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn"> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" />
                </div>
                <div className="row actions">
                    <input type="submit" value="登录"/>
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <label><input type="radio" value="signUp" /> 注册</label>
                        <label><input type="radio" value="signIn" /> 登录</label>
                    </nav>
                    <div className="panes">
                        {signUpForm}
                        {signInForm}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog;