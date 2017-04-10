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
      newTodo: 'test',
      todoList: [
        {id:1, title:'第一个待办'},
        {id:2, title:'第二个待办'},
        {id:3, title:'第三个待办'}
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map(function(item, index){
      return <TodoItem title={item.title} />;
    });
    return (
      
      <div className="TodoApp">
        <h1>我的待办</h1>
        <TodoInput />
        <ul>
            {todos}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
