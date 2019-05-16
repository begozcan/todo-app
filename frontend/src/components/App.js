import React from 'react';
import './App.scss';
import TodoList from './todo-list/TodoList';

function App() {
    return (
        <div className="app-container">
            <TodoList/>
            <div className="footer">
                Made with <span role="img" aria-label="love">&#x1F49B;</span> by
                <a href="http://github.com/begozcan" target="_blank" rel="noopener noreferrer"> begozcan</a>
            </div>
        </div>
    );
}

export default App;
