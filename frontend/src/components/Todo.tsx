import { useEffect, useState } from 'react';
import { AddDialog } from './AddDialog';
import type { BasicTodo, Todo } from '../types';
import { fetchTodos } from '../apis/fetchTodos';
import { createTodo } from '../apis/createTodo';
import { updateTodo } from '../apis/updateTodo';
import { deleteTodo } from '../apis/deleteTodo';
import { Task } from './Task';

export const TodoComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleCreate = async (todo: BasicTodo) => {
        try {
            const newTodo = await createTodo(todo);
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error('Failed to create todo:', error);
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const updatedTodos = await Promise.all(
                todos.map(async todo => {
                    if (todo._id === id) {
                        const updatedTodo = { ...todo, completed: !todo.completed };
                        await updateTodo(id, updatedTodo);
                        return updatedTodo;
                    }
                    return todo;
                })
            );
            setTodos(updatedTodos); // Update the local state
        } catch (error) {
            console.error('Failed to toggle todo status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const data = await fetchTodos();
                setTodos(data);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        fetchAllData();
    }, []);

    return (
        <>
            <div className='rounded-2xl p-6 min-w-[600px] max-w-3xl flex flex-col gap-6 justify-start'>
                <p className='text-gray-400 text-center font-thin text-3xl'>Todo Application</p>
                <div className='w-full flex justify-end'>
                    <button
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'
                        onClick={() => setIsOpen(true)}
                    >
                        Add
                    </button>
                </div>

                <ul className='divide-y divide-gray-100'>
                    {todos.map((todo, index) => (
                        <Task
                            key={index}
                            todo={todo}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            </div>
            <AddDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleCreate={handleCreate}
            />
        </>
    );
};
