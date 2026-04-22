import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Auth Utilities
 * Helper functions for checking authentication status
 */

/**
 * Get the current session on the server
 * Use this in Server Components and API routes
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Check if the current user is authenticated
 * Returns true if user is logged in, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in API routes that require authentication
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
