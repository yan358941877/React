import React from 'react';

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
      return <li>{item.title}</li>;
    });
    return (
      
      <div className="TodoApp">
        
        <h1>我的待办</h1>
        <div className="TodoInput">
            <input type="text" value={this.state.newTodo}/>
        </div>
        <ul>
            {todos}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
