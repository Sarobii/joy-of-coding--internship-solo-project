import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import TaskProvider from "@/components/TaskProvider";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <TaskProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add New Task</h2>
            <TaskForm />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}