export interface BasicTodo {
    title: string;
    description: string;
};

export interface Todo extends BasicTodo {
    _id: string;
    completed: boolean;
}
