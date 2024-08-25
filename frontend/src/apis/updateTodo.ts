import type { Todo } from '../types';

export const updateTodo = async (id: string, todo: Todo) => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
        const response = await fetch(`${apiURL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update todo:', error);
        throw error;
    }
};
