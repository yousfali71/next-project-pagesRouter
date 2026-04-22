import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth API Route Handler for Pages Router
 * Handles all authentication endpoints
 */
export default NextAuth(authOptions);
