import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Admin-only content: Manage users here.</p>
    </main>
  );
}