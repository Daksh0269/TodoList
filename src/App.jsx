import { useState } from 'react'
import { ContextProvider, } from './context/export'
import './App.css'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
   const [error, setError] = useState('');
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { ...todo }])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) => (
      prev.map((todo) => todo.id === id
        ? { ...todo, completed: !todo.completed } : todo)
    ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
    , [todos])

  return (
    <ContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-300 text-red-700 rounded-lg shadow-lg animate-fade-in">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      <div className="bg-[#0a1422] min-h-screen py-8 animated-bg ">
        <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-3 overflow-x-hidden align-middle items-center" style={{ maxWidth: "700px", maxHeight: "80vh", overflowY: "auto" }}>
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className='w-4/5 mx-auto' key={todo.id}
              >
                <TodoItem todo={todo} setAppError={setError}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}

export default App
