import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
}
