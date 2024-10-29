import { GetServerSideProps } from 'next';
import { useState } from 'react';
// import { Todo } from '../types/todo';




interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

interface Props {
  initialTodos: Todo[];
}

export default function Home({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const deleteTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

// Server-side rendering
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/todos');
  const initialTodos: Todo[] = await response.json();

  return { props: { initialTodos } };
};
