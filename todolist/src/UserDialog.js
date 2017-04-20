import React from "react";
import './UserDialog.css';
import { signUp, getCurrentUser } from './leanCloud'

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
    // 切换登录和注册功能
    switchOperate(event) {
        this.setState({
            selected: event.target.value
        })
    }
    // 当用户在登录或注册对话框上输入用户名和密码时，修改state
    handleInput(key, event) {
        //console.log(event.target.value);
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData[key] = event.target.value;
        this.setState(stateCopy);
    }

    // 当用户提交时进行的操作
    handleSubmit(type, event) {
        // 因为当用户点击登录或者注册时，需要将相关信息显示在TodoApp上，且TodoApp还会对这些信息进行处理，因此 此处应该调用TodoApp(父级组件)的相关方法来将信息传递回去
        // 或者先进行注册，然后将注册得到的信息传递回去
        event.preventDefault();

        let username = this.state.formData.username;
        let password = this.state.formData.password;
        let error = function () {
            console.log('error');
        }
        if (type === 'signUp') {
            let success = this.props.onSignUp;
            signUp(username, password, success, error);
        }
    }
    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.handleSubmit.bind(this, 'signUp')}> {/* 注册*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username} onChange={this.handleInput.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password} onChange={this.handleInput.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <input type="submit" value="注册" />
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn"> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username} onChange={this.handleInput.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password} onChange={this.handleInput.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <input type="submit" value="登录" />
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <label>
                            <input type="radio" value="signUp" checked={this.state.selected === "signUp"} onChange={this.switchOperate.bind(this)} /> 注册
                        </label>
                        <label>
                            <input type="radio" value="signIn" checked={this.state.selected === "signIn"} onChange={this.switchOperate.bind(this)} /> 登录
                        </label>
                    </nav>
                    <div className="panes">
                        {this.state.selected == 'signUp' ? signUpForm : signInForm}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog;