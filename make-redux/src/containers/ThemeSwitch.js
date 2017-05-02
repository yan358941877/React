
import {connect} from 'react-redux'
import ThemeSwitch from '../components/ThemeSwitch'

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


export default connect(mapStateToProp, mapDispatchToProp)(ThemeSwitch)