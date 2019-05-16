import express from 'express';
import {TodoItem} from '../models/TodoItem';

const router = express.Router();

/**
 * Get all TodoItems
 * @param req: Must be empty
 * @return res: {todoItems: TodoItem[]}
 * */
router.get('/', (req, res, next) => {
  TodoItem.find({}).then(todoItems => {
    res.json({todoItems});
  });
});

/**
 * Add a new TodoItem
 * @param req: {title: string, description: string, dueDate: Date}
 * @return res: Added TodoItem
 * */
router.post('/', (req, res, next) => {
  const todoItem = new TodoItem(req.body);
  todoItem.save()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
});

/**
 * Remove a TodoItem
 * @param req: {_id: string}
 * @return res: Empty
 * */
router.delete('/', (req, res, next) => {
  TodoItem.findOneAndDelete(req.body)
      .then(() => res.json())
      .catch((err) => res.json(err));
});

/**
 * Modify a TodoItem
 * @param req: {_id: string, isComplete: boolean}
 * @return res: Empty
 * */
router.put('/', (req, res, next) => {
  TodoItem.findOneAndUpdate(req.body._id, {isComplete: req.body.isComplete})
      .then(() => res.json())
      .catch((err) => res.json(err));
});

export default router;
