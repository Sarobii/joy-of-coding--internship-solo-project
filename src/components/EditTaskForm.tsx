'use client';

import React, { useState } from 'react';
import { useTasks } from './TaskProvider';
import { Task } from '@prisma/client';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

export default function EditTaskForm({ task, onClose }: EditTaskFormProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate.toISOString().split('T')[0]);
  const { updateTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask({
      ...task,
      name,
      description,
      dueDate: new Date(dueDate),
      updatedAt: new Date(),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label" htmlFor="edit-name">
          <span className="label-text">Task Name</span>
        </label>
        <input
          type="text"
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="edit-description">
          <span className="label-text">Task Description</span>
        </label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="textarea textarea-bordered h-24"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="edit-dueDate">
          <span className="label-text">Due Date</span>
        </label>
        <input
          type="date"
          id="edit-dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Update Task</button>
      <button type="button" onClick={onClose} className="btn btn-secondary w-full">Cancel</button>
    </form>
  );
}