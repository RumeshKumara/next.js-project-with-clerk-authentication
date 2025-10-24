import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p>You don&apos;t have permission to access this page.</p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">Go Home</Link>
    </main>
  );
}