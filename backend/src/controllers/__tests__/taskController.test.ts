import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { getTasks, createTask, updateTaskCompletion, deleteTask } from '../taskController';
import Task from '../../models/taskModel';
import Logger from '../../utils/logger';

const app = express();
app.use(express.json());
app.get('/tasks', getTasks);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTaskCompletion);
app.delete('/tasks/:id', deleteTask);

jest.mock('../../models/taskModel');
jest.mock('../../utils/logger');

describe('Task Controller', () => {
    beforeAll(() => {
        mongoose.connect = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /tasks', () => {
        it('should retrieve all tasks', async () => {
            const mockTasks = [
                { _id: '1', title: 'Test Task 1', description: 'Task 1 description', completed: false },
                { _id: '2', title: 'Test Task 2', description: 'Task 2 description', completed: true },
            ];
            (Task.find as jest.Mock).mockResolvedValue(mockTasks);

            const res = await request(app).get('/tasks');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockTasks);
            expect(Logger.info).toHaveBeenCalledWith('Tasks retrieved successfully');
        });

        it('should return a 500 error if there is a server error', async () => {
            (Task.find as jest.Mock).mockRejectedValue(new Error('Server Error'));

            const res = await request(app).get('/tasks');

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Server Error' });
            expect(Logger.error).toHaveBeenCalledWith('Error retrieving tasks: Error: Server Error');
        });
    });

    describe('POST /tasks', () => {
        it('should create a new task', async () => {
            const newTask = { _id: '1', title: 'New Task', description: 'New task description', completed: false };

            const mockSave = jest.fn().mockResolvedValue(newTask);
            const MockTask = Task as unknown as jest.Mock;
            MockTask.mockImplementation(() => ({
                ...newTask,
                save: mockSave,
            }));

            const res = await request(app).post('/tasks').send({ title: 'New Task', description: 'New task description' });
            expect(res.status).toBe(201);
            expect(res.body).toEqual(newTask);
            expect(Logger.info).toHaveBeenCalledWith('Task created successfully: New Task');
        });

        it('should return a 400 error if creation fails', async () => {
            (Task.prototype.save as jest.Mock).mockRejectedValue(new Error('Bad Request'));

            const res = await request(app).post('/tasks').send({ title: 'New Task', description: 'New task description' });

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: 'Bad Request' });
            expect(Logger.error).toHaveBeenCalledWith('Error creating task: Error: Bad Request');
        });
    });

    describe('PUT /tasks/:id', () => {
        it('should update the completion status of a task', async () => {
            const updatedTask = { _id: '1', title: 'Test Task', description: 'Task description', completed: true };
            (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

            const res = await request(app).put('/tasks/1').send({ completed: true });

            expect(res.status).toBe(200);
            expect(res.body).toEqual(updatedTask);
            expect(Logger.info).toHaveBeenCalledWith('Task updated successfully: 1');
        });

        it('should return a 404 error if the task is not found', async () => {
            (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            const res = await request(app).put('/tasks/1').send({ completed: true });

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: 'Task not found' });
            expect(Logger.warn).toHaveBeenCalledWith('Task not found for ID: 1');
        });

        it('should return a 500 error if there is a server error', async () => {
            (Task.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Server Error'));

            const res = await request(app).put('/tasks/1').send({ completed: true });

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Server Error' });
            expect(Logger.error).toHaveBeenCalledWith('Error updating task completion: Error: Server Error');
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete a task by its ID', async () => {
            const deletedTask = { _id: '1', title: 'Test Task', description: 'Task description', completed: false };
            (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedTask);

            const res = await request(app).delete('/tasks/1');

            expect(res.status).toBe(204);
            expect(Logger.info).toHaveBeenCalledWith('Task deleted successfully: 1');
        });

        it('should return a 404 error if the task is not found', async () => {
            (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            const res = await request(app).delete('/tasks/1');

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: 'Task not found' });
            expect(Logger.warn).toHaveBeenCalledWith('Task not found for ID: 1');
        });

        it('should return a 500 error if there is a server error', async () => {
            (Task.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Server Error'));

            const res = await request(app).delete('/tasks/1');

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Server Error' });
            expect(Logger.error).toHaveBeenCalledWith('Error deleting task: Error: Server Error');
        });
    });
});
