import React, {Component, PropTypes} from 'react'

export const connect = (mapStateToProps)=> (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(){
            super()
            this.state = {}
        }
        componentWillMount(){
            const {store} = this.context
            this._updateProps()
            store.subscribe(()=>this._updateProps())
        }

        _updateProps(){
            const {store} = this.context
            let stateProps = mapStateToProps(store.getState())
            this.setState({
                
                    ...stateProps
               
            })
        }
        render(){
            console.log({...this.state})
            // const {store} = this.context
            // let stateProps = mapStateToProps(store.getState())
            return <WrappedComponent {...this.state}/>
        }
    }

    return Connect
}