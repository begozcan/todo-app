import axios from 'axios';
import {ADD_TODO, CHANGE_TODO_STATUS, FETCH_TODOS, REMOVE_TODO, SHOW_ADD_FORM} from './types';

export function fetchTodos() {
    return dispatch => {
        axios.get('/api/todo')
            .then(resp => {
                const todos = resp.data.todoItems;
                dispatch({type: FETCH_TODOS, payload: todos});
            });
    }
}

export function addTodo(title, dueDate) {
    return dispatch => {
        axios.post('/api/todo', {title: title, dueDate: dueDate})
            .then(resp => {
                dispatch({type: ADD_TODO, payload: resp.data});
                dispatch({type: SHOW_ADD_FORM, payload: false});
            });
    }
}

export function changeTodoStatus(id, isComplete) {
    return dispatch => {
        axios.put('/api/todo', {_id: id, isComplete})
            .then(() => {
                dispatch({type: CHANGE_TODO_STATUS, payload: {id, isComplete}});
            });
    }
}

export function removeTodo(id) {
    return dispatch => {
        axios.delete('/api/todo', {data: {_id: id}})
            .then(() => {
                dispatch({type: REMOVE_TODO, payload: {id}});
            });
    }
}
