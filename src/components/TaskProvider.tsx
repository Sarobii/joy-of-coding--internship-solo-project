'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTaskStatus: (id: string, status: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export default function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    const response = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = async (id: string, status: string) => {
    const response = await fetch('/api/tasks/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const deleteTask = async (id: string) => {
    await fetch('/api/tasks/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}