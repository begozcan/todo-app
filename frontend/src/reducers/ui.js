import {SHOW_ADD_FORM} from '../actions/types';

export default function (state = {showAddForm: false}, action) {
    switch (action.type) {
        case SHOW_ADD_FORM:
            return Object.assign({}, state, {showAddForm: action.payload});
        default:
            return state;
    }
}
