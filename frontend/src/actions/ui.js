import {SHOW_ADD_FORM} from './types';

export function toggleShowAddForm(status) {
    return {type: SHOW_ADD_FORM, payload: status};
}
