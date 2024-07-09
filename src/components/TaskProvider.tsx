"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Task } from "@prisma/client";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  sortCriteria: "dueDate" | "name" | "status";
  filterCriteria: string | null;
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  updateTaskStatus: (id: string, status: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  sortTasks: (sortBy: "dueDate" | "name" | "status") => void;
  filterTasks: (status: string | null) => void;
  sortAndFilterTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [sortCriteria, setSortCriteria] = useState<
    "dueDate" | "name" | "status"
  >("dueDate");
  const [filterCriteria, setFilterCriteria] = useState<string | null>(null);

  const sortAndFilterTasks = useCallback(() => {
    let sorted = [...tasks];

    // Sort
    switch (sortCriteria) {
      case "dueDate":
        sorted.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    // Filter
    if (filterCriteria) {
      sorted = sorted.filter((task) => task.status === filterCriteria);
    }

    setFilteredTasks(sorted);
  }, [tasks, sortCriteria, filterCriteria]);

  useEffect(() => {
    const fetchTasks = async () => {
      // Fetch tasks from the backend
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    sortAndFilterTasks();
  }, [tasks, sortCriteria, filterCriteria, sortAndFilterTasks]);

  const addTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    // Add task to the backend
    const response = await fetch("/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = async (task: Task) => {
    // Update task in the backend
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        dueDate: new Date(task.dueDate).toISOString(),
      }),
    });
    const updatedTask = await response.json();
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  const updateTaskStatus = async (id: string, status: string) => {
    // Update task status in the backend
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const updatedTask = await response.json();
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? updatedTask : t))
    );
  };

  const deleteTask = async (id: string) => {
    // Delete task from the backend
    await fetch(`/api/tasks/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const sortTasks = (sortBy: "dueDate" | "name" | "status") => {
    setSortCriteria(sortBy);
  };

  const filterTasks = (status: string | null) => {
    setFilterCriteria(status);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        sortCriteria,
        filterCriteria,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        sortTasks,
        filterTasks,
        sortAndFilterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
