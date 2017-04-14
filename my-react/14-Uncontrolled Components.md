### Uncontrolled Components

在大多数情况下，我们推荐使用受控组件。在受控组件中，表单数据是由React组件掌握的。相对应的是不受控组件，他们的表单数据是有DOM元素自己掌控的。

使用不受控组件，我们可以不用为了state的改变而写很多时间处理函数。我们可以通过ref来从DOM中获取表单元素的value

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  // 这里的<input type="text"...就是一个非受控组件
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### Default Values

在React的生命周期中，form元素中的value属性将会被DOM的value覆盖。使用非受控组件时，可能需要为form元素指定一个初始值（通过设置value），但是会让后续的update不受控（由于form元素的value被设定为一个固定值，因此对form元素的操作时不会引起其value的变化---无法对form元素进行操作）。为了解决这个问题，我们可以使用defaultValue来替换value。

```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

`<input type="checkbox">`和`<input type="radio">`支持defaultChecked，`<select>`和`<textarea>`支持defaultValue