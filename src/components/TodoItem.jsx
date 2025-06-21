import React from 'react'
import { useTodo } from '../context/TodoContext'
import { useState } from "react";


function TodoItem({ todo,setAppError }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id,)
  }
  const handleEditClick = () => {
    if (todo.completed) {
      setAppError("can't edit a completed task")
      setTimeout(() => setAppError(''), 2000) // Hide after 2s
      return
    }
    setIsTodoEditable(true)
  }
  return (
    <div
      className={`flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-500 mb-4 shadow-sm transform ${todo.completed
          ? 'bg-green-50 border-green-300 shadow-green-200 scale-[1.02]'
          : 'bg-white border-gray-200 hover:shadow-md'
        }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 w-full">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="w-5 h-5 accent-green-600 cursor-pointer transition-transform duration-300"
          checked={todo.completed}
          onChange={toggleCompleted}
        />

        {/* Editable Input */}
        <input
          type="text"
          className={`w-full px-3 py-1 rounded-md outline-none transition-all duration-300 text-base font-medium ${isTodoEditable
              ? 'border border-green-400 bg-white shadow-sm'
              : 'bg-transparent border-none'
            } ${todo.completed ? 'line-through text-green-700' : 'text-gray-800'}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-4">
        <button
          className="w-9 h-9 flex items-center justify-center text-lg rounded-md bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 disabled:opacity-50 transition"
          onClick={() => {
            if (isTodoEditable) {
              editTodo();
            } else {
              handleEditClick()
            }
          }}

        >
          {isTodoEditable ? '💾' : '✏️'}
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center text-lg rounded-md bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 transition"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
      </div>
      
    </div>
  );
}

export default TodoItem