import React, {Component, PropTypes} from 'react'

import {connect} from './react-redux'

class Header extends Component {
    static propTypes = {
        // store: PropTypes.object
        themeColor: PropTypes.string
    }
    // constructor(){
    //     super()
    //     this.state = {themeColor: ''}
    // }
    // componentWillMount(){
    //     const {store} = this.context
    //     this._updateThemeColor()
    //     store.subscribe(()=>this._updateThemeColor())
    // }
    // _updateThemeColor(){
    //     const {store} = this.context
    //     const state = store.getState()
    //     this.setState({
    //         themeColor: state.themeColor
    //     })
    // }
    render(){
        console.log('header', this.props)
        return (
            <h1 style={{color: this.props.themeColor}}>Hello React</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Header = connect(mapStateToProps)(Header)

export default Header