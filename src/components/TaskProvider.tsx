'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '@prisma/client';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
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
    setTasks(data.map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    })));
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, {
      ...newTask,
      dueDate: new Date(newTask.dueDate),
      createdAt: new Date(newTask.createdAt),
      updatedAt: new Date(newTask.updatedAt)
    }]);
  };

  const updateTask = async (task: Task) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(t => t.id === task.id ? {
      ...updatedTask,
      dueDate: new Date(updatedTask.dueDate),
      createdAt: new Date(updatedTask.createdAt),
      updatedAt: new Date(updatedTask.updatedAt)
    } : t));
  };

  const updateTaskStatus = async (id: string, status: string) => {
    const response = await fetch('/api/tasks/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task.id === id ? {
      ...updatedTask,
      dueDate: new Date(updatedTask.dueDate),
      createdAt: new Date(updatedTask.createdAt),
      updatedAt: new Date(updatedTask.updatedAt)
    } : task));
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
    <TaskContext.Provider value={{ tasks, addTask, updateTask, updateTaskStatus, deleteTask }}>
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