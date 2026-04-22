import { DefaultSession } from "next-auth";

/**
 * Extend NextAuth types to include custom fields
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
