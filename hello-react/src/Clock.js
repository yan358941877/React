import React from "react";

// function Clock(props) {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {props.date.toLocaleTimeString()}.</h2>
//         </div>
//     )
// }
// function tick() {
//     ReactDOM.render(
//         <Clock date={new Date()} />,
//         document.getElementById("root02")
//     );
// }
// setInterval(tick, 1000);
class Clock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render () {
        return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        );
    }  
}