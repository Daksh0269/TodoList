import React from "react";
import { useTodo } from "../context/TodoContext";
import { useState } from "react";



function TodoForm() {
    const [todo, setTodo] = useState('');
    const { addTodo } = useTodo();

    const addFunction = (e) => {
        e.preventDefault();

        if (!todo) return
        const newTodo = {
            id: Date.now(), // unique ID
            todo,           // the actual text from input
            completed: false // initially not completed
        };

        addTodo(newTodo);
        setTodo('')
    }

    return (
        <form onSubmit={addFunction} className="flex">
            <input
                type="text"
                placeholder="Add a task..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm