import React from 'react';
import {Link, IndexLink} from 'react-router'
import NavLink from './NavLink'

// 定义App组件
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role='nav'>
                    <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
                    <li><NavLink to="/about" >About</NavLink></li>
                    <li><NavLink to="/repos" >Repos</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}