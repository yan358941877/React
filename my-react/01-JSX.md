### JSX

* JSX是JavaScript的一种语法拓展,我们在React中用它来描述UI的样子.

### 在JSX中嵌入表达式

* 可以在JSX中嵌入任意JavaScript表达式通过将表达式用大括号包裹起来的方法

```
function formatName(user){
	return user.firstName + ' ' + user.lastName;
}

const user = {
	firstName: "Harper",
	lastName: "Perez"
};

// {formatName(user)}会自动执行里面的内容,得到 "Harper Perez"
const element = {
	<h1>
		Hello, {formatName(user)}! 
	</h1>
};

ReactDOM.render{
	element,
	document.getElementById("root");
};
```

### JSX同样也是表达式

* 经过编译,JSX表达式会变为一个JavaScript对象,这意味着可以使用JSX作为if中的条件,用于for循环,将它赋值给一个变量,将它作为变量接受以及作为函数的结果返回

```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### 在JSX中指定属性

* 将用引号包围的字符串作为属性,(注意JSX更接近于JavaScript而不是HTML,因此属性名都是按照驼峰规则来命名的)

```
const element = <div tableIndex = "0"></div>
```

* 使用大括号包围的JavaScript表达式作为属性

```
const element = <img src = {user.avatarUrl}></img>
```

### 在JSX中指定子节点

* 如果一个标签是空的,可以使用/>将它立即关闭

```
const element = <img src={user.avatarUrl} />;
```

* JSX标签也可以包含子节点(注意要用小括号包围起来)

```
const element = (
	<div>
		<h1>Hello!</h1>
		<h2>Good to see you here.</h2>
	</div>
);
```


### JSX转化的对象

* Babel将JSX编译为 React.createElement() 调用
* 一下两段代码是等价的

```
const element = (
	<h1 className = "greeting">
		Hello,world!
	</h1>
);
```

```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

* 这样的对象就是"React 对象",详细描述了这些元素最终在屏幕上如何展示,React通过这些对象构造DOM,并持续更新









