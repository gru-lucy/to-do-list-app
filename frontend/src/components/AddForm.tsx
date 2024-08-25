import { ChangeEvent, FormEvent, useState } from "react";
import type { BasicTodo } from "../types";

interface AddFormProps {
    handleCreate: (todo: BasicTodo) => void;
};

export const AddForm = ({
    handleCreate
}: AddFormProps) => {
    const [todo, setTodo] = useState<BasicTodo>({ title: "", description: "" });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCreate(todo);
    };

    return (
        <form className="flex flex-col items-end" onSubmit={handleSubmit}>
            <div className="mb-6 w-full">
                <label htmlFor="title" className="block mb-2 text-sm font-light text-gray-400">Title</label>
                <input
                    type="text"
                    id="title"
                    className="bg-transparent border border-gray-700 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Title"
                    required
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6 w-full">
                <label htmlFor="description" className="block mb-2 text-sm font-light text-gray-400">Description</label>
                <input
                    type="text"
                    id="description"
                    className="bg-transparent border border-gray-700 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Description"
                    required
                    name="description"
                    value={todo.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                Add
            </button>
        </form>
    );
};
