import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Setup() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Set default role if not set (server action)
  if (!(user.privateMetadata as any)?.role) {
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: { role: "customer" },
    });
    redirect("/"); // Redirect to home after setting
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold">Setup Complete</h1>
      <p>Redirecting to dashboard...</p>
    </main>
  );
}