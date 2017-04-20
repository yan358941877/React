import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import UserDialog from './UserDialog';
import 'normalize.css';
import 'reset.css';
import './index.css';
import './TodoApp.css';


ReactDOM.render(
  <UserDialog />,
  document.getElementById('root')
);
