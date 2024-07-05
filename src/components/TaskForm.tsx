'use client';

import React, { useState } from 'react';
import { useTasks } from './TaskProvider';

export default function TaskForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await addTask({ name, description, dueDate });
    setName("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Task Name</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="description">
          <span className="label-text">Task Description</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
          className="textarea textarea-bordered h-24"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="dueDate">
          <span className="label-text">Due Date</span>
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Add Task</button>
    </form>
  );
}