// app/dashboard/page.tsx
import { clerkClient } from "@clerk/nextjs/server";
import Dashboard from "./_component/DashboardClient";

export default async function Page() {
  const client = await clerkClient();
  const userList = await client.users.getUserList();

  // Wir übergeben nur die Zahl (totalCount)
  return <Dashboard totalUsersCount={userList.totalCount} />;
}
