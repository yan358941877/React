import React, { Component, PropTypes } from 'react'

export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor() {
            super()
            this.state = { allProps: {} }
        }
        componentWillMount() {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }

        _updateProps() {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState(), this.props)
            // 可能这个新生成的组件会接收参数？
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...this.props
                }
            })
        }
        render() {
            console.log(this.props)
            // const {store} = this.context
            // let stateProps = mapStateToProps(store.getState())
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connect
}