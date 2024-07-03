'use client';

import { useState, useEffect } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  interface Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
  }

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
