import { Router } from 'express';
import {
    getTasks,
    createTask,
    updateTaskCompletion,
    deleteTask,
} from '../controllers/taskController';

const router = Router();

/**
 * @route GET /tasks
 * @description Retrieve a list of all tasks.
 * @access Public
 * @returns {Object[]} - An array of task objects.
 * @returns {500} - Server Error if the tasks cannot be retrieved.
 */
router.get('/tasks', getTasks);

/**
 * @route POST /tasks
 * @description Create a new task.
 * @access Public
 * @body {string} title - The title of the task.
 * @body {string} description - A brief description of the task.
 * @returns {Object} - The newly created task object.
 * @returns {400} - Bad Request if the task data is invalid.
 */
router.post('/tasks', createTask);

/**
 * @route PUT /tasks/:id/completion
 * @description Update the completion status of a task.
 * @access Public
 * @param {string} id - The ID of the task to update.
 * @body {boolean} completed - The new completion status of the task.
 * @returns {Object} - The updated task object.
 * @returns {404} - Not Found if the task with the given ID does not exist.
 * @returns {500} - Server Error if the task cannot be updated.
 */
router.put('/tasks/:id', updateTaskCompletion);

/**
 * @route DELETE /tasks/:id
 * @description Delete a task by its ID.
 * @access Public
 * @param {string} id - The ID of the task to delete.
 * @returns {204} - No Content if the task is successfully deleted.
 * @returns {404} - Not Found if the task with the given ID does not exist.
 * @returns {500} - Server Error if the task cannot be deleted.
 */
router.delete('/tasks/:id', deleteTask);

export default router;
