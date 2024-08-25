import type { Todo } from '../types';

interface TaskProps {
    todo: Todo;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const Task = ({
    todo,
    onToggleStatus,
    onDelete,
}: TaskProps) => {
    return (
        <li className='flex justify-between gap-x-6 py-5'>
            <div className='flex min-w-0 gap-x-4'>
                <div className='min-w-0 flex-auto text-wrap'>
                    <p className={`text-xl font-semibold leading-6 text-gray-400 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</p>
                    <p className={`mt-1 text-md leading-5 text-gray-500 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>
                </div>
            </div>
            <div className='sm:flex sm:flex-col sm:items-end'>
                <button
                    className='focus:outline-none w-28 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
                    onClick={() => onToggleStatus(todo._id)}
                >
                    {todo.completed ? 'Unmark' : 'Mark'}
                </button>

                <button
                    className='focus:outline-none w-28 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
                    onClick={() => onDelete(todo._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};
