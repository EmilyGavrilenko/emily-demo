import { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { user } = useAuth();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos(user!.sub);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
  };

  const pending = todos.filter(t => !t.completed);
  const completed = todos.filter(t => t.completed);

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
        <button type="submit" className="add-btn" disabled={!input.trim()}>
          Add
        </button>
      </form>

      {todos.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Add one above!</p>
        </div>
      )}

      {pending.length > 0 && (
        <section className="todo-section">
          <h2 className="section-title">
            To Do <span className="count">{pending.length}</span>
          </h2>
          <ul className="todo-list">
            {pending.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        </section>
      )}

      {completed.length > 0 && (
        <section className="todo-section">
          <h2 className="section-title">
            Completed <span className="count">{completed.length}</span>
          </h2>
          <ul className="todo-list">
            {completed.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
