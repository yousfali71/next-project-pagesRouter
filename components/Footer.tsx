import { APP_NAME } from "@/lib/constants";

/**
 * Site Footer
 * Displays copyright information
 */
export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 py-8 text-center text-sm text-neutral-500">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">{APP_NAME}</span>. All rights
        reserved.
      </p>
    </footer>
  );
}

