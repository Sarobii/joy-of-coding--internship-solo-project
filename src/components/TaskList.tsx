'use client';

import React, { useState } from "react";
import { useTasks } from "./TaskProvider";
import EditTaskForm from "./EditTaskForm";
import { Task } from "@prisma/client";
import FilterSort from "./FilterSort";

const statusColors = {
  "To Do": "bg-yellow-100",
  "In Progress": "bg-blue-100",
  "Finished!": "bg-green-100",
};

export default function TaskList() {
  const { tasks, filteredTasks, updateTaskStatus, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleStatusChange = (id: string, status: string) => {
   updateTaskStatus(id, status);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <FilterSort />
      {filteredTasks.length === 0 ? (
        <p className="text-base-content opacity-60">No tasks added yet.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`card ${
                statusColors[task.status as keyof typeof statusColors]
              } shadow-sm`}
            >
              <div className="card-body">
                <h3 className="card-title">{task.name}</h3>
                <p>{task.description}</p>
                <p className="text-sm opacity-70">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Finished!">Finished!</option>
                  </select>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <EditTaskForm 
              task={editingTask} 
              onClose={() => setEditingTask(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
