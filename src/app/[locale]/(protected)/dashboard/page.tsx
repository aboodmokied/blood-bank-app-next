import { ModeToggle } from "@/components/mode-toggle";
import { getUserFromToken } from "@/lib/auth";

export default async function Dashboard() {

  const user:any = await getUserFromToken();

  return (
    <div>
      <ModeToggle/>  
      <h1>Dashboard</h1>
      <h1>{user.role}</h1>
    </div>
  );
}
