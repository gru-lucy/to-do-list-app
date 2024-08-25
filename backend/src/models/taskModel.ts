import { Schema, model } from 'mongoose';

/**
 * @interface ITask
 * @description Defines the structure of a Task document in MongoDB.
 * @property {string} title - The title of the task.
 * @property {string} description - A brief description of the task.
 * @property {boolean} completed - Indicates whether the task is completed or not. Defaults to false.
 */
interface ITask {
    title: string;
    description: string;
    completed: boolean;
}

/**
 * @constant TaskSchema
 * @description Defines the schema for the Task model in MongoDB.
 * @type {Schema<ITask>}
 * @property {string} title - The title of the task (required).
 * @property {string} description - A brief description of the task (required).
 * @property {boolean} completed - Indicates whether the task is completed or not (defaults to false).
 */
const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

/**
 * @constant Task
 * @description The Mongoose model for the Task schema.
 * @type {Model<ITask>}
 * 
 * This model is used to interact with the `tasks` collection in MongoDB.
 */
const Task = model<ITask>('Task', TaskSchema);

export default Task;
