### Refs and the DOM

在典型的React数据流中，props是父级组件与子组件交互的唯一方式。为了修改一个子组件需要用新的props来渲染。然而，存在一些情况需要--脱离典型数据流的方式去修改子组件。子组件可以作为一个React组件或DOM元素来修改。

### When to Use Refs

这里有几种使用refs的情况
* 管理焦点、文本选择、多媒体播放
* 触发指令动画
* 和第三方DOM库交互

### 给DOM元素增加一个ref属性

React支持一个特殊的属性，这个属性可以添加在任何组件中。ref属性指向了一个callback function(回调函数)，这个回调函数会在组件加载或卸载后立即执行

当ref属性被用于HTML元素时，ref指向的回调函数接收当前DOM元素作为参数。例如，下面的代码使用ref回调函数去存储一个DOM节点的引用

```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    // 注意：ref中的参数input指的是<input type="text"...这个dom元素，参数input只是个参数名，可以换其他参数名
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```

React会在组件装载时调用回调函数以DOM元素作为参数，当被卸载时调用回调函数并将null作为参数

### 在Class组件中添加ref

当ref属性被用于自定义类组件时，这个ref回调函数 **接受一个已经加载的组件实例作为参数** 。

```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
      </div>
    );
  }
}
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    // 这里的focus方法实际上是CustomTextInput组件实例的focus方法
    this.textInput.focus();
  }
  // 这里的ref中的参数input指的是已经加载完毕的CustomTextInput组件实例，然后将this.textInput指向该实例
  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

### Refs和函数式组件

* 不能在函数式组件中使用ref属性，因为函数式组件没有实例

```
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // This will *not* work!
    // 由于函数式组件没有实例，因此ref中的参数input其实不是一个组件实例，因此无法通过这种方式获得组件实例
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

* 如果引用了DOM元素或者类组件，也是可以在函数式组件汇总使用ref属性的

```
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }
  // 这里ref中的input参数指的就是该<input type="text".....元素
  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```
