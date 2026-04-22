import { handler } from "@/lib/auth";

/**
 * NextAuth API Route Handler
 * Handles all authentication endpoints:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback/[provider]
 * - /api/auth/session
 */
export { handler as GET, handler as POST };
