import { ReactNode } from "react";
import ModernNavbar from "./ModernNavbar";
import ModernFooter from "./ModernFooter";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main Layout Component
 * Wraps all pages with Navbar and Footer
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ModernNavbar />
      <main className="flex-1">{children}</main>
      <ModernFooter />
    </div>
  );
}
