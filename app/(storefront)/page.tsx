import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

/**
 * Home Page
 * Landing page with hero section featuring gradient effects
 * and call-to-action buttons
 */
export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden bg-neutral-950 px-4">
      {/* Gradient overlay for visual depth */}
      <div
        className="pointer-events-none absolute inset-0 yh-hero-shine bg-gradient-to-br from-teal-600/30 via-neutral-950 to-black"
        aria-hidden
      />
      
      {/* Decorative gradient orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-teal-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="yh-animate-up text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
          {APP_NAME}
        </p>
        <h1 className="yh-animate-up yh-delay-1 mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Discover products you'll love.
        </h1>
        <p className="yh-animate-up yh-delay-2 mx-auto mt-5 max-w-md text-base leading-relaxed text-neutral-400">
          Browse our collection of high-quality items carefully selected to meet your needs.
        </p>
        
        {/* Call-to-action buttons */}
        <div className="yh-animate-up yh-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex rounded-lg bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/35 transition duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-black/30"
          >
            Shop now
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-lg border border-white/20 bg-transparent px-8 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/40 hover:bg-white/5"
          >
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}

