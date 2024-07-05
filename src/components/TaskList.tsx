'use client';

import React from 'react';
import { useTasks } from './TaskProvider';

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-base-content opacity-60">No tasks added yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{task.name}</h3>
                <p>{task.description}</p>
                <p className="text-sm opacity-70">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}