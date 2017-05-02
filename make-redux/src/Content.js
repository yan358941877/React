import React, {Component,  PropTypes} from 'react'
import ThemeSwitch from './ThemeSwitch'
import {connect} from './react-redux'
/*class Content extends Component {
    static contextTypes = {
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
        let {store} = this.context
        const state = store.getState()
        this.setState({
            themeColor: state.themeColor
        })
    }
    render(){
        return (
            <div>
                <p style={{color: this.state.themeColor}}>Hello React!</p>
                <ThemeSwitch />
            </div>
        )
    }
}

export default Content*/

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }

    render(){
        return (
            <div>
                <p style={{color: this.props.themeColor}}>Hello React</p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        themeColor: state.themeColor
    }
}

Content = connect(mapStateToProps)(Content)

export default Content