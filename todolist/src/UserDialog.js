import React from "react";

class UserDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="userDialog">
                <label for="login">登录</label>
                <input type="radio" name="operate" id="login" />
                <label for="signup">注册</label>
                <input type="radio" name="operate" id="signup" />
                <div class="login-operate">
                    <p><span>用户名：</span><input type="text" /></p>
                    <p><span>密码：</span><input type="password" /></p>
                    <button>登录</button>
                </div>
                <div class="signup-operate">
                    <p><span>用户名：</span><input type="text" /></p>
                    <p><span>密码：</span><input type="password" /></p>
                    <button>注册</button>
                </div>
            </div>
        )
    }
}