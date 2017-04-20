import React from "react";
import './UserDialog.css';
import { signUp, signIn} from './leanCloud'

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
        let errorFn = function (error) {
            if(error.code === 202){
                alert("该用户名已被占用，请更换用户名重新注册！");
            }else if(error.code === 210){
                alert("用户名和密码不匹配，请重新输入！");
            }else if(error.code === 211){
                alert("该用户不存在，请重新输入用户名");
            }else{
                alert(error);
            }
        }
        if (type === 'signUp') {
            let successFn = this.props.onSign;
            signUp(username, password, successFn,errorFn);
            
        }
        if (type === 'signIn'){
            let successFn = this.props.onSign;
            signIn(username, password, successFn,errorFn);
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
            <form className="signIn" onSubmit={this.handleSubmit.bind(this, 'signIn')}> {/* 登录*/}
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
                        {this.state.selected === 'signUp' ? signUpForm : signInForm}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog;