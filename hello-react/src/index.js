import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import './index.css';

ReactDOM.render( 
    <TodoApp /> ,
    document.getElementById('root')
);
// ReactDOM.render( 
//     <h1> Hello, React! </h1>,
//     document.getElementById('root02')
// );

//不够"模块化",无法实现复用
// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, World!</h1>
//             <h1>It is {new Date().toLocaleString()}.</h1>
//         </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById('root02')
//     );
// }
// setInterval(tick, 1000);