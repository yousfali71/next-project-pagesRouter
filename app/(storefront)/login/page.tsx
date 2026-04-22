"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/Logo";

/**
 * Login Page
 * OAuth authentication with Google and GitHub
 */
export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/products");
    }
  }, [session, router]);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider, { callbackUrl: "/products" });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-neutral-950">
        <div className="text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-neutral-950 px-4 py-16">
      {/* Radial gradient background effect */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.15),_transparent_55%)]"
        aria-hidden
      />

      {/* Login form card */}
      <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-10 shadow-2xl yh-animate-up">
        <div className="mb-8 flex justify-center">
          <Logo variant="onDark" href="/" />
        </div>

        <h2 className="text-center text-2xl font-black text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Sign in with your account
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* Google Sign In Button */}
          <button
            onClick={() => handleOAuthSignIn("google")}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-700 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition hover:bg-neutral-100"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* GitHub Sign In Button */}
          <button
            onClick={() => handleOAuthSignIn("github")}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
