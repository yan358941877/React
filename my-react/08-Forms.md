### Forms

在React中,form元素和其他DOM元素是有些不同的,因为form元素保存着一些内部状态.

```
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交这个表单时,这个form有默认的HTML form行为:跳转到一个新的页面.在React中这种默认的行为同样有效.但是在大多数情况下,用一个JavaScript方法来处理表单(和用户输入的数据)的提交行为是很便利的.在React中有标准的方法来实现--"controlled components"(被控制组件)

#### Controlled components

在HTML中,表单元素:`<input>` `<textarea>`和`<select>`是基于用户输入来维持自己的状态和更新的.在React中,易变的状态通常保存在组件的state中,并且只能通过setState()来更新.(意思是html 表单元素有自己的state,而React中的组件也有state)

我们能够组合上面提到的两种state--使React state成为"单一事实来源".然后渲染form的React组件能够控制用户在form中输入的内容.一个输入表单元素的值是由其他React组件控制的，这时我们称这个输入表单元素为“被控制组件”

举个例子:如果我们想当表单被提交时,输出name，input元素是被控制组件

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

由于value属性是由form组件设定的，因此展现的值将始终为`this.state.value`,使得React的state成为了单一数据源。按下任意按键时，`handleChange`会被执行去更新React的state，因此展现的value始终是用户输入的内容。

在控制组件中，任意state(表单元素的state)的触发将会关联一个事件处理函数。在这个事件处理函数中，我们可以对用户的输入进行验证或修改。
