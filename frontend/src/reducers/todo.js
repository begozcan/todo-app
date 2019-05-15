import {ADD_TODO, CHANGE_TODO_STATUS, FETCH_TODOS, REMOVE_TODO} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TODOS:
            return [...action.payload];
        case ADD_TODO:
            return [...state, action.payload];
        case CHANGE_TODO_STATUS:
            const newState = [...state];
            newState.find((todo) => todo._id === action.payload.id).isComplete = action.payload.isComplete;
            return newState;
        case REMOVE_TODO:
            return state.filter((todo) => todo._id !== action.payload.id);
        default:
            return state;
    }
}
