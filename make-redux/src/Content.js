import React, {Component, PropTypes} from 'react'
import ThemeSwitch from './ThemeSwitch'
import {connect} from './react-redux'
class Content extends Component {
    static contextTypes = {
        // store: PropTypes.object
        store: PropTypes.object
    }
    constructor(){
        super()
        this.state = {
            themeColor: ''
        }
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
            themeColor: state.ThemeColor
        })
    }
    render(){
        return (
            <div>
                <p style={{color: this.state.themeColor}}>React.js</p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        themeColor: state.themeColor
    }
}
//Content = connect(mapStateToProps)(Content)

export default Content