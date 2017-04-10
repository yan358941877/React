import React from 'react';
// class Welcome extends React.Component {
//     render() {
//         return <h1> Hello, {this.props.name} from Class</h1>;
//     }
// }

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

//为什么要 export  , 为什么要加defualt
export default Welcome;