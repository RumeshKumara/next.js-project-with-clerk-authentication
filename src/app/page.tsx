import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const role = (user.privateMetadata as any)?.role as string;
  if (!role) redirect("/profile/setup");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p className="mb-4">Your role: <span className="font-semibold">{role}</span></p>
      
      {role === "admin" && (
        <div className="mb-4 p-4 bg-blue-100 rounded">
          <h2 className="font-semibold">Admin Panel</h2>
          <a href="/admin/dashboard" className="text-blue-600 hover:underline">Manage Users</a>
        </div>
      )}
      
      {role === "customer" && (
        <div className="mb-4 p-4 bg-green-100 rounded">
          <h2 className="font-semibold">Customer Dashboard</h2>
          <a href="/dashboard" className="text-green-600 hover:underline">View Orders</a>
        </div>
      )}
      
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}