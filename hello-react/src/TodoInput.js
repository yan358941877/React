import React from "react";

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
/*
 * onKeyPress: 事件监听器
 * submit: 事件处理函数
 * defalutValue: 为input元素设置默认初始值,该值只能用一次
 */
    render() {
        return ( 
            <div className = "TodoInput" >
            <input type = "text"
            defaultValue = ""
            onKeyPress = { this.submit }
            /> 
            </div >
        )
    }

/*
 * this.props.onSubmit是对TodoApp的addTodo方法的引用,调用TodoApp的addTodo方法
 * e.target.value = ''; 将输入框清空
 */ 
    submit(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit.call(null, e);
            e.target.value = '';
        }
    }
}

export default TodoInput;