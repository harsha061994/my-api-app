import type { NextApiRequest, NextApiResponse } from 'next';
// import { Todo } from '../../types/todo';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

let todos: Todo[] = [
  { id: 1, text: 'Learn Next.js', completed: false },
  { id: 2, text: 'Build a Todo app', completed: false },
];

// GET, POST, DELETE handlers
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const newTodo: Todo = { id: Date.now(), ...req.body, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
