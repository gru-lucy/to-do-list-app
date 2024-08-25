export const fetchTodos = async () => {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
        const response = await fetch(`${apiURL}/tasks`);
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
