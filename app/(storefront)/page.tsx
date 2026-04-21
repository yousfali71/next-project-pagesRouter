import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

/**
 * Home Page
 * Landing page with hero section featuring gradient effects
 * and call-to-action button
 */
export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden px-4">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')",
        }}
        aria-hidden
      />

      {/* Dark overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-950/90 via-neutral-900/85 to-black/90"
        aria-hidden
      />

      {/* Animated gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 yh-hero-shine bg-gradient-to-tr from-teal-600/20 via-transparent to-teal-500/10"
        aria-hidden
      />

      {/* Decorative gradient orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-teal-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl"
        aria-hidden
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="yh-animate-up text-xs font-semibold uppercase tracking-[0.4em] text-teal-400">
          Welcome to {APP_NAME}
        </p>
        <h1 className="yh-animate-up yh-delay-1 mt-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Your Destination for Quality Products
        </h1>
        <p className="yh-animate-up yh-delay-2 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
          Explore our curated collection of premium products designed to enhance
          your lifestyle. Find exactly what you need, backed by quality and
          exceptional service.
        </p>

        {/* Call-to-action button */}
        <div className="yh-animate-up yh-delay-3 mt-12">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-10 py-4 text-base font-bold text-white shadow-2xl shadow-teal-600/40 transition duration-300 hover:-translate-y-1 hover:shadow-teal-600/60"
          >
            Start Shopping
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
