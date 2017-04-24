import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import 'reset.css';
import './TodoApp.css';
import * as localStore from './localStore';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: localStore.load('todolist') || []
    };
    this.addTodo = this.addTodo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  render() {
    
    let self = this;
    let todos = this.state.todoList.map(function(item, index){
      if(item.deleted){
        return false;
      }
      return (
        <TodoItem key={item.id} todo={item} onToggle={self.toggle} onDelete={self.deleteItem}/>
      )
    });

    return ( 
      <div className="TodoApp">
        <h1>我的待办</h1>
        <TodoInput onSubmit={this.addTodo}/>
        <ul>
            {todos}
        </ul>
      </div>
    );
  }
  componentDidUpdate(){
         localStore.save('todoList', this.state.todoItemList);
  }
  addTodo(event){
    //往todoList中新增数据,通过event.target.value来获取用户的输入
    if(event.target.value.length > 0 && event.target.value.trim().length > 0){
        this.state.todoList.push({
          id: this.state.todoList.length+1,
          title: event.target.value,
          status: null,
          deleted: false,
        });
        
        // 会重新调用render方法
        this.setState({
          todoList:this.state.todoList
        })
        localStore.save('todoList', this.state.todoList)
    }
  }
  
  // 勾选框的相关操作
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state);
    localStore.save('todoList', this.state.todoList)
  }

  // 删除事项的操作
  // 这里的todo是对todoList中某项的引用,在这里修改同样会修改todoList对应的项目
  deleteItem(e, todo){
    todo.deleted = true;
    this.setState(this.state);
    localStore.save('todoList', this.state.todoList)
  }
}

export default TodoApp;
