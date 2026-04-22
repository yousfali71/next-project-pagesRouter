"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Auth Provider Component
 * Wraps the app with NextAuth SessionProvider for client-side session access
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
