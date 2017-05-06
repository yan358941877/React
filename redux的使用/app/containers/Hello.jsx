import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userinfoActions from '../actions/userinfo'

import A from '../components/A'
import B from '../components/B'
import C from '../components/C'


class Hello extends React.Component {
    componentWillMount(){
        console.log('aaa')
        console.log(this.props.userinfo)
        console.log(this.props.userinfoActions.login)
    }
    componentDidMount() {
        // 模拟登陆，当组件第一次加载完毕时，调用dispatch来修改状态，引起页面的重新渲染
        var a = this.props.userinfoActions.login({
            userid: 'abc',
            city: 'beijing'
        })
        console.log("did mount")
        console.log(this.props.userinfo)
    }
    componentDidUpdate(){
        console.log("did update")
        console.log(this.props.userinfo)

    }
    render() {
        console.log("render")
        console.log(this.props.userinfo)
        return (
            <div>
                <p>hello world</p>
                <hr/>
                <A userinfo={this.props.userinfo}/>
                <hr/>
                <B userinfo={this.props.userinfo}/>
                <hr/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //userinfoActions是一个对象，其中包含两个函数：login和updateCityName,向这两个函数传入对应的data，就会返回相应的action
        //bindActionCreators(userinfoActions, dispatch)会返回一个对象
        /* {
            login: (data)=> {dispatch(login(data))},
            updateCityName: (data)=>{dispatch(updateCityName(data))}
        }*/
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)
