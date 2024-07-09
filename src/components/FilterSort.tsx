import React from "react";
import { useTasks } from "./TaskProvider";

export default function FilterSort() {
  const { sortTasks, filterTasks } = useTasks();

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          onChange={(e) =>
            sortTasks(e.target.value as "dueDate" | "name" | "status")
          }
          className="select select-bordered select-sm"
        >
          <option value="dueDate">Due Date</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter" className="mr-2">
          Filter by status:
        </label>
        <select
          id="filter"
          onChange={(e) =>
            filterTasks(e.target.value === "all" ? null : e.target.value)
          }
          className="select select-bordered select-sm"
        >
          <option value="all">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished!">Finished!</option>
        </select>
      </div>
    </div>
  );
}
