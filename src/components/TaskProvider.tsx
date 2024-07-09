'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '@prisma/client';
import { toast } from 'react-hot-toast'; 

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
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      })));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks. Please try again.');
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const newTask = await response.json();
      setTasks([...tasks, {
        ...newTask,
        dueDate: new Date(newTask.dueDate),
        createdAt: new Date(newTask.createdAt),
        updatedAt: new Date(newTask.updatedAt)
      }]);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please try again.');
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === task.id ? {
        ...updatedTask,
        dueDate: new Date(updatedTask.dueDate),
        createdAt: new Date(updatedTask.createdAt),
        updatedAt: new Date(updatedTask.updatedAt)
      } : t));
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/tasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? {
        ...updatedTask,
        dueDate: new Date(updatedTask.dueDate),
        createdAt: new Date(updatedTask.createdAt),
        updatedAt: new Date(updatedTask.updatedAt)
      } : task));
      toast.success('Task status updated successfully');
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch('/api/tasks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
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
