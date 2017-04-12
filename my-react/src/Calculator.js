import React from "react";
import TemperatureInput from "./TemperatureInput";

const scaleName = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: ''
        }
        this.handlerCelTemChange = this.handlerCelTemChange.bind(this);
        this.handlerFahTemChange = this.handlerFahTemChange.bind(this);
    }
    handlerCelTemChange(event){
        this.setState({
            scale: 'c',
            temperature: event.target.value
        });
    }
    handlerFahTemChange(event){
        this.setState({
            scale: 'f',
            temperature: event.target.value
        });
    }
    render() {
        let temperature = this.state.temperature;
        let celsius;
        let fahrenheit;
        if(this.state.scale === 'c'){
            celsius = this.state.temperatue;
            fahrenheit = tryConvert(temperature, toFahrenheit);
        }else {
            fahrenheit = this.state.temperature;
            celsius = tryConvert(temperature, toCelsius);
        }
        return (
            <div>
                <TemperatureInput temperature={celsius} scale='c' onTemChange={this.handlerCelTemChange}/>
                <TemperatureInput temperature={fahrenheit} scale='f' onTemChange={this.handlerFahTemChange}/>
            </div>
        )
    }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert){
  const input = parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output*1000)/1000;
  return rounded.toString();
}

export default Calculator;