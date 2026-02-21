import { useState, useCallback, useEffect } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

function getStorageKey(userId: string) {
  return `todos_${userId}`;
}

function loadTodos(userId: string): Todo[] {
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
}

function saveTodos(userId: string, todos: Todo[]) {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(todos));
}

export function useTodos(userId: string) {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos(userId));

  useEffect(() => {
    setTodos(loadTodos(userId));
  }, [userId]);

  useEffect(() => {
    saveTodos(userId, todos);
  }, [userId, todos]);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
