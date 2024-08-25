import { updateTodo } from '../updateTodo'; // Update the path to where your function is located
import type { Todo } from '../../types';

describe('updateTodo', () => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a todo successfully', async () => {
        const mockId = '123';
        const mockTodo: Todo = { _id: mockId, title: 'Updated Todo', description: 'updated todo description', completed: false };
        const mockResponse = { _id: mockId, title: 'Updated Todo', description: 'updated todo description', completed: false };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await updateTodo(mockId, mockTodo);

        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });

    it('should throw an error if the API returns an error', async () => {
        const mockId = '123';
        const mockTodo: Todo = { _id: mockId, title: 'Updated Todo', description: 'updated description', completed: false };

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Not Found',
        });

        await expect(updateTodo(mockId, mockTodo)).rejects.toThrow('Error: Not Found');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });

    it('should throw an error if fetch fails', async () => {
        const mockId = '123';
        const mockTodo: Todo = { _id: mockId, title: 'Updated Todo', description: 'updated description', completed: false };

        global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

        await expect(updateTodo(mockId, mockTodo)).rejects.toThrow('Network Error');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });
});
