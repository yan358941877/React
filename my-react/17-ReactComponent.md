## React.Component

组件使我们将UI分割成功能独立、可复用的部分

### 概观

`React.Component`是一个抽象的基类，所以很少直接使用`React.Component`。通常会建立一个它的子类，在这个子类中只少会有一个`render()`方法

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 组件的生命周期

每个组件都有一些“生命周期方法”，因此可以选择在特定的时间运行特定的代码。带有`will`前缀的方法，会在一些事件发生之前调用，带有`did`前缀的方法会在一些事件发生之后调用

#### Mounting

当组件实例被创建、被插入到DOM中的过程中被调用

* constructor()
* componentWillMount()
* render()
* componentDidMount()

#### Updating

当props和state被改变时会引起组件的更新。下面这些方法会在组件被重新渲染时调用

* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()
* render()
* componentDidUpdate()

#### Unmounting

当组件实例将要从DOM中被移除时，下面这个方法会被调用

* componentWillUnmount()

### 参考

#### render()

* `render()`方法是一个组件必须的方法
* `render()`方法可以返回null或false，表示不需要渲染任何东西。
* `render()`不应该修改组件的状态
* 当`shouldComponentUpdate()`返回false时，`render()`方法将不会被调用

#### constructor()

React组件的构造函数会在组件加载之前被调用。当执行构造函数时，应该在任何语句之前调用`super(props)`。否则`this.props`将会使undefined。

构造函数是初始化state的正确位置。如果没有初始化state也没有bind method，那么React组件不应该执行构造函数

#### componentWillMount()

在组件加载之前`componentWillMount()`会被立即调用。它会在`render()`方法之前被调用，因此在这个方法中设置状态并不会触发重新渲染。

这个方法是唯一的可以在服务器渲染调用的生命周期方法“钩子”。

#### componentDidMount()



