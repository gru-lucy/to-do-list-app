import { Request, Response } from 'express';
import Task from '../models/taskModel';
import Logger from '../utils/logger';

/**
 * @description Retrieves all tasks from the database.
 * @route GET /tasks
 * @access Public
 * @returns {Object} - A list of tasks.
 * @returns {Error} - Server error if retrieval fails.
 */
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        Logger.info('Tasks retrieved successfully');
        res.json(tasks);
    } catch (err) {
        Logger.error(`Error retrieving tasks: ${err}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @description Creates a new task in the database.
 * @route POST /tasks
 * @access Public
 * @param {Object} req.body - The task details (title and description).
 * @param {string} req.body.title - The title of the task.
 * @param {string} req.body.description - The description of the task.
 * @returns {Object} - The created task.
 * @returns {Error} - Bad request error if creation fails.
 */
export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({ title, description });
        await newTask.save();
        Logger.info(`Task created successfully: ${title}`);
        res.status(201).json(newTask);
    } catch (err) {
        Logger.error(`Error creating task: ${err}`);
        res.status(400).json({ message: 'Bad Request' });
    }
};

/**
 * @description Updates the completion status of a task.
 * @route PUT /tasks/:id
 * @access Public
 * @param {string} req.params.id - The ID of the task to update.
 * @param {Object} req.body - The update details (completed status).
 * @param {boolean} req.body.completed - The new completion status of the task.
 * @returns {Object} - The updated task.
 * @returns {Error} - Task not found or server error.
 */
export const updateTaskCompletion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );

        if (!updatedTask) {
            Logger.warn(`Task not found for ID: ${id}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        Logger.info(`Task updated successfully: ${id}`);
        res.json(updatedTask);
    } catch (err) {
        Logger.error(`Error updating task completion: ${err}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @description Deletes a task by its ID.
 * @route DELETE /tasks/:id
 * @access Public
 * @param {string} req.params.id - The ID of the task to delete.
 * @returns {void} - No content on successful deletion.
 * @returns {Error} - Task not found or server error.
 */
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            Logger.warn(`Task not found for ID: ${id}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        Logger.info(`Task deleted successfully: ${id}`);
        res.status(204).send();
    } catch (err) {
        Logger.error(`Error deleting task: ${err}`);
        res.status(500).json({ message: 'Server Error' });
    }
};
