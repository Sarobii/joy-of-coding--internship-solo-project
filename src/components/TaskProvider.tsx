'use client';

import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';

// Create a context for tasks
const TaskContext = createContext<{
  tasks: any[];
  addTask: (newTask: any) => Promise<void>;
  fetchTasks: () => Promise<void>;
}>({
  tasks: [],
  addTask: () => Promise.resolve(),
  fetchTasks: () => Promise.resolve(),
});

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async (newTask: any) => {
    try {
      const res = await fetch("/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
      const task = await res.json();
      setTasks(prevTasks => [...prevTasks, task]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);

export default TaskProvider;