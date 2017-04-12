import React from "react";

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.handlerKeyPress = this.handlerKeyPress.bind(this);
    }
    handlerKeyPress(event) {
        //alert("按下了按键!");
        this.props.keyPress(event);
    }
    render() {
        return  (
            <div className="TodoInput">
                <input type="text" defaultValue="" onKeyPress={this.handlerKeyPress}/>
            </div>
        )
    }
}

export default TodoInput;