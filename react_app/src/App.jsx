import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Poznać Reacta', done: false },
  { id: 2, title: 'Zbudować pierwszą apkę', done: true },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTitle, setNewTitle] = useState('')

  const doneCount = tasks.filter((task) => task.done).length

  const addTask = (event) => {
    event.preventDefault()
    const title = newTitle.trim()
    if (!title) return

    setTasks((prev) => [...prev, { id: Date.now(), title, done: false }])
    setNewTitle('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    )
  }

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <main className="app">
      <h1>Lista zadań</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nowe zadanie"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type="submit" aria-label="Dodaj zadanie">
          +
        </button>
      </form>

      <p className="counter">
        Ukończone: {doneCount} / {tasks.length}
      </p>

      {tasks.length === 0 ? (
        <p className="empty">Brak zadań. Dodaj pierwsze!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task">
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? 'title done' : 'title'}>
                  {task.title}
                </span>
              </label>
              <button
                type="button"
                className="delete"
                aria-label={`Usuń zadanie ${task.title}`}
                onClick={() => removeTask(task.id)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
