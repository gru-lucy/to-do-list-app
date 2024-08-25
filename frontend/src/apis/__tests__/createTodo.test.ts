import { createTodo } from '../createTodo';

describe('createTodo', () => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new todo successfully', async () => {
        const mockTodo = { title: 'Test Todo', description: 'Test todo' };
        const mockResponse = { id: 1, ...mockTodo };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await createTodo(mockTodo);

        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });

    it('should throw an error if the API returns an error', async () => {
        const mockTodo = { title: 'Test Todo', description: 'Test todo' };

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Internal Server Error',
        });

        await expect(createTodo(mockTodo)).rejects.toThrow('Error: Internal Server Error');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });

    it('should throw an error if fetch fails', async () => {
        const mockTodo = { title: 'Test Todo', description: 'Test todo' };

        global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

        await expect(createTodo(mockTodo)).rejects.toThrow('Network Error');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });
});
