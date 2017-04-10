import React from "react";

class TodoInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'test'
        }
    }

    render(){

        return (
            <div>
                <input type="text" value={this.state.value}/>
            </div>
        )
    }
}

export default TodoInput;