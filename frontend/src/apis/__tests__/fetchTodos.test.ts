import { fetchTodos } from '../fetchTodos'; // Update the path to where your function is located

describe('fetchTodos', () => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    beforeEach(() => {
        // Clear any previous mock data
        jest.clearAllMocks();
    });

    it('should fetch todos successfully', async () => {
        const mockTodos = [
            { _id: '1', title: 'Todo 1', description: 'hello', completed: false },
            { _id: '2', title: 'Todo 2', description: 'hello', completed: true },
        ];

        // Mock the fetch function to return a successful response
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockTodos),
        });

        const result = await fetchTodos();

        expect(result).toEqual(mockTodos);
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks`);
    });

    it('should throw an error if the fetch fails', async () => {
        // Mock the fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

        await expect(fetchTodos()).rejects.toThrow('Network Error');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks`);
    });
});
