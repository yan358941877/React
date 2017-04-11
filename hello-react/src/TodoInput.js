import React from "react";

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    render() {
        return ( 
            <div className = "TodoInput" >
            <input type = "text"
            defaultValue = { this.props.content }
            onKeyPress = { this.submit }
            /> 
            </div >
        )
    }

    submit(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit.call(null, e);
            e.target.value = '';
        }
    }
}

export default TodoInput;