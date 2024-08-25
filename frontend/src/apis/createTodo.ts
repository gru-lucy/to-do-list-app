import type { BasicTodo } from '../types';

export const createTodo = async (todo: BasicTodo) => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
        const response = await fetch(`${apiURL}/tasks`, {
            method: 'POST',
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
        console.error('Failed to create todo:', error);
        throw error;
    }
};
