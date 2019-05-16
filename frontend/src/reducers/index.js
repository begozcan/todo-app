import {combineReducers} from 'redux';
import todoItemReducer from './todo';
import uiReducer from './ui';

export default combineReducers({
    todos: todoItemReducer,
    ui: uiReducer
});
