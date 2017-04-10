import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import 'reset.css';
import './TodoApp.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoList: [
        {id:1, title:'第一个待办'},
        {id:2, title:'第二个待办'},
        {id:3, title:'第三个待办'}
      ]
    };
    this.addTodo = this.addTodo.bind(this);
  }
  render() {
    let todos = this.state.todoList.map(function(item, index){
      return <TodoItem todo={item} />;
    });
    return (
      
      <div className="TodoApp">
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTod} onSubmit={this.addTodo}/>
        <ul>
            {todos}
        </ul>
      </div>
    );
  }
  addTodo(event){
    //console.log(this);
    //往todoList中新增数据
    this.state.todoList.push({
      id: this.state.todoList.length+1,
      title: event.target.value,
      status: null,
      deleted: false
    });

    this.setState({
      newTodo: '',
      todoList:this.state.todoList
    })

  }
}

export default TodoApp;
