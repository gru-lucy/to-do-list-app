import { AddForm } from "./AddForm";
import type { BasicTodo } from "../types";

interface AddDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleCreate: (todo: BasicTodo) => void;
};

export const AddDialog = ({
    isOpen,
    setIsOpen,
    handleCreate,
}: AddDialogProps) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCreateAndCloseDialog = (todo: BasicTodo) => {
        handleCreate(todo);
        setIsOpen(false);
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-md w-full">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-light text-gray-400">Dialog Title</h3>
                    <button
                        className="bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 text-white"
                        onClick={handleClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4">
                    <AddForm
                        handleCreate={handleCreateAndCloseDialog}
                    />
                </div>
            </div>
        </div>
    ) : null;
};
