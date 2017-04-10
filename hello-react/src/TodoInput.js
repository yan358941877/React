import React from "react";

class TodoInput extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        return (
            <div className="TodoInput">
                <input type="text" defaultValue={this.props.content}/>
            </div>
        )
    }
}

export default TodoInput;