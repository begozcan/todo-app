import {model, Schema} from 'mongoose';

const TodoItemSchema = new Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    isComplete: {type: Boolean, default: false},
    dueDate: {type: Date, default: null}
});

/**
 * Validations
 */

TodoItemSchema.path('title').required(true, 'Title cannot be blank');

export const TodoItem = model('TodoItem', TodoItemSchema);
