React提供了一个声明式的API,我们不需要担心每次更新时到底做了哪些详细的改变。这使得写app变得更加简单了，但是在React中是如何执行的却显得不够明显。这篇文章解释了React中的“diffing“算法是如何做的使得组件更新是可预测的并且高性能apps足够快。

### 动机

在某一时刻使用React时，你可以认为`render()`函数是用来创建一个React元素树的。当state或者props更新时，`render()`函数将会返回一个不同的React元素树。React需要解决如何高效地更新UI去匹配最新的React元素树。

对于使用最少的操作来实现React元素树向另一棵树的转变，在这个算法中已经存在了一些同样的解决方案。然而，最先进的算法的时间复杂度为O(n^3),n是React元素树中元素的数量。

如果在React中使用这些算法，展现1000个元素将会需要十亿次的比较，这个代价太大了。与此不同的是，React实现了一个具有O(n)复杂度的启发式算法，这个算法基于两个假设：

1. 两个不同类型的元素将会生成不同的树
2. 开发者可以认为使用key属性的子元素在不同的渲染之间是稳定的

实际上，这些假设是合理的在的几乎所有的实际使用中

### Diffing算法

当比较两颗树时，React先比较两个树的根元素。如果根节点不同，则行为也是不同的

#### 不同类型的元素

每当根元素有不同的类型时，React将会删除就的DOM树，并且从头开始重新构建新的DOM树。

在删除一颗树时，旧的DOM节点会被销毁。组件实例触发`componentWillUnmount()`。当新建一颗树时，新的DOM节点被插入进DOM中。组件实例触发`componentWillMount()`,并且然后触发`componentDidMount()`。任何与原来的树相关的state将被丢弃。

在根元素下的任何元素都会被卸载，并且他们的state都会被销毁。例如：

```
从
<div>
    <Counter />
</div>
变为
<span>
    <Counter />
</span>
```

上面的例子将会销毁旧的Counter，并且重新构建一个新的

#### DOM元素的类型相同

当比较两个相同类型的React DOM元素时。React会先查看两者的属性差异，然后保留DOM节点，只更新被更改的属性。

例如：

```
从：
<div className="before" title="stuff" />
变为：
<div className="after" title="stuff" />
```

通过比较这两个元素，React知道只需修改DOM节点中的className属性

当更新`style`时，React同样知道只更新改变了的特性。例如：

```
从
<div style={{color: 'red', fontWeight: 'bold'}} />
变为：
<div style={{color: 'green', fontWeight: 'bold'}} />
```

React知道只修改color样式，而不修改fontWeight

**在处理完DOM节点后，React会按照上面的规则重新扫描其后代元素**

#### 相同类型的组件元素

当一个组件更新(前后组件的类型保持不变)，这个组件实例会保持不变，因此在不同的渲染之间组件内的state是保持不变的。 React会更新组件实例的props来匹配新元素，并在实例上调用componentWillReceiveProps()和componentWillUpdate()

例如

```
<Component content="a" />
更新为
<Component style="b" />
```

接下来，调用render方法，diff算法会对上一个结果和新结果进行递归比较

#### 递归子元素

默认情况下，当对DOM节点的子元素进行递归时，React只是同时迭代两个子元素list，并且在存在差异时产生变化

例如：在元素的最后添加子元素,这两棵树的转换效率、性能更好

```
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React将匹配两个`<li>one</li>`树，匹配两个`<li>two</li>`树，然后插入一个`<li>three</li>`树。

如果在子元素的开头部分插入一个元素的话，性能就会变差:

```
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

这种情况React将更改每个子元素 ，而不会意识到它可以保持<li>one</li>和<li>two</li>子元素树不变。 这种低效率的情况是一个必须注意的问题。

#### Keys

为了解决上述问题，React提供了一个`key`属性。当子元素有key属性时，React会按照key将原始树中的子元素与后续树中的子元素进行匹配。例如，上面的那个低效例子添加一个key就可以让子元素树转换的效率更高：

```
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在React就知道了带有`2014`key的元素是新增的元素，并且`key=2014 和 key=2015'这两个元素只需移动即可。

在实际应用中，查找一个key通常并不复杂。你需要展现的元素可能已经有一个唯一的ID,所以key可以来自于自己的数据中:`<li key={item.id}>{item.name}</li>`

如果不是这样，你可以向数据模型中给每一项数据添加一个新的ID属性，或者对内容的某些部分进行哈希生成key。 key属性只有在其兄弟元素之间是唯一的，并不是全局唯一的。

最后一种方式是可以将数组中的索引作为key。 如果数组中的每一项不需要重新排序，同样也可以很好地工作，但是万一需要重新排序的话，这会变的很慢。


### 权衡取舍

我们精炼出来的启发式规则是为了使通用实例更快

因为React很依赖上面的启发式规则来判断DOM是否需要重新处理，如果不能满足这个算法的那两个假设条件前提，应用的性能将会受到很大影响。

1. 该算法不会去尝试匹配那些不同组件类型的子元素树。 如果你看到自己的返回值在两个组件类型之间来回变化，你应该需要把它们改为相同的类型组件。
2. key属性应该是稳定，可预测和唯一的。 不稳定的键(如使用Math.random()生的key)将导致许多组件实例和DOM节点进行不必要地重复创建，这可能导致子组件中的性能降低和state丢失。