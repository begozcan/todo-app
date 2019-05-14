import React from 'react';
import './App.scss';
import {TodoList} from './todo-list/TodoList';

function App() {
  return (
      <div className="app-container">
        <TodoList/>
      </div>
  );
}

export default App;
