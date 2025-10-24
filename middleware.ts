import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in/[[...sign-in]]", "/sign-up/[[...sign-up]]", "/profile/setup"],
  async afterAuth(auth, req) {
    // Protect /admin routes
    if (auth.userId && req.nextUrl.pathname.startsWith("/admin")) {
      const user = await clerkClient.users.getUser(auth.userId);
      const role = (user.privateMetadata as any)?.role as string;
      if (role !== "admin") {
        const unauthorizedUrl = new URL("/unauthorized", req.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};