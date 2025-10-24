import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const role = (user.privateMetadata as any)?.role as string;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
      <p>Role: {role || "Not set"}</p>
    </main>
  );
}