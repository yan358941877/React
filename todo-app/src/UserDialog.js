import React, {Component} from 'react'
import './UserDialog.css'
class UserDialog extends Component {
    render(){
        return (
            <div className='UserDialog'>
                <div className="dialog-panel">
                    <div className='user-operate'>
                        <input type="radio" name="login" id="login"/>
                        <label htmlFor="login">登录</label>
                        <input type="radio" name="login" id="signup"/>
                        <label htmlFor="signup">注册</label>
                    </div>
                    <div className="user-info">
                        <span>用户名</span>
                        <input type="text" />
                    </div>
                    <div className="user-info">
                        <span>密码</span>
                        <input type="password" />
                    </div>
                    <div className="user-submit">
                        <button>登录</button>
                    </div>
                </div>
            </div>    
        )
    }
}

export default UserDialog