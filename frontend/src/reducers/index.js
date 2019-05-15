import {combineReducers} from 'redux';
import todoItemReducer from './todo';

export default combineReducers({
    todos: todoItemReducer,
});
