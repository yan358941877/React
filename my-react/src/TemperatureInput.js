import React from "react";

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handlerChange = this.handlerChange.bind(this);
    }
    handlerChange(event){
        this.props.onTemChange(event);
    }
    render() {
        return (
            <fieldset>
                <legend>
                Enter temperature in {this.props.scale === "c"?"Celsius":"Fahrenheit"}
                </legend>
                <input type="text" 
                    value={this.props.temperature}
                    onChange={this.handlerChange}/>
            </fieldset>
        )
    }
}

export default TemperatureInput;