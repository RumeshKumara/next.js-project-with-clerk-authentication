import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      routing="path"
      redirectUrl="/profile/setup" // Ensures redirect after sign-up
    />
  );
}