import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
/*class ThemeSwitch extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor(){
        super()
        this.state = {themeColor: ''}
    }

    componentWillMount(){
        const {store} = this.context
        this._updateThemeColor()
        store.subscribe(()=>this._updateThemeColor())
    }
    _updateThemeColor(){
        const {store} = this.context
        const state = store.getState()
        this.setState({
            themeColor: state.themeColor
        })
    }
    handleSwitchColor(color){
        const {store} = this.context
        store.dispatch({
            type: 'CHANGE_COLOR',
            themeColor: color
        })
    }
    render(){
        return (
            <div>
                <button
                    style={{color: this.state.themeColor}}
                    onClick={this.handleSwitchColor.bind(this, 'red')}>Read</button>
                <button
                    style={{color: this.state.themeColor}}
                    onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
            </div>
        )
    }
}

export default ThemeSwitch*/

class ThemeSwitch extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    }
    handleSwitchColor(color){
        if(this.props.onSwitchColor){
            this.props.onSwitchColor(color)
        }
    }
    render(){
        return (
            <div>
                <button
                    style={{color: this.props.themeColor}}
                    onClick={this.handleSwitchColor.bind(this, 'red')}>Read</button>
                <button
                    style={{color: this.props.themeColor}}
                    onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return {
        themeColor: state.themeColor
    }
}

const mapDispatchToProp = (dispatch)=>{
    return {
        onSwitchColor: (color)=>{
            dispatch({type: 'CHANGE_COLOR', themeColor: color})
        }
    }
}

ThemeSwitch = connect(mapStateToProp, mapDispatchToProp)(ThemeSwitch)

export default ThemeSwitch