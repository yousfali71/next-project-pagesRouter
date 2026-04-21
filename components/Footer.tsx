import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

/**
 * Site Footer
 * Displays navigation links and copyright information
 */
export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold text-white">{APP_NAME}</p>
            <p className="mt-2 text-sm text-neutral-400">
              Your destination for quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-neutral-300 transition hover:text-teal-400"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/new"
                  className="text-sm text-neutral-300 transition hover:text-teal-400"
                >
                  Add Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-300 transition hover:text-teal-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-300 transition hover:text-teal-400"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Connect
            </h3>
            <p className="mt-4 text-sm text-neutral-300">
              Building something great.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">{APP_NAME}</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
