export const deleteTodo = async (id: string) => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
        const response = await fetch(`${apiURL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return { message: 'Todo successfully deleted' };
    } catch (error) {
        console.error('Failed to delete todo:', error);
        throw error;
    }
};
