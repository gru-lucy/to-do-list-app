import { deleteTodo } from '../deleteTodo';

describe('deleteTodo', () => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a todo successfully', async () => {
        const mockId = '123';

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
        });

        const result = await deleteTodo(mockId);

        expect(result).toEqual({ message: 'Todo successfully deleted' });
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should throw an error if the API returns an error', async () => {
        const mockId = '123';

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Not Found',
        });

        await expect(deleteTodo(mockId)).rejects.toThrow('Error: Not Found');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should throw an error if fetch fails', async () => {
        const mockId = '123';

        global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

        await expect(deleteTodo(mockId)).rejects.toThrow('Network Error');
        expect(fetch).toHaveBeenCalledWith(`${apiURL}/tasks/${mockId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});
