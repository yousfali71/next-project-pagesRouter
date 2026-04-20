import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

type LogoProps = {
  variant?: "onDark" | "onLight";
  href?: string | null;
  className?: string;
};

export default function Logo({
  variant = "onDark",
  href = "/",
  className = "",
}: LogoProps) {
  const isDark = variant === "onDark";
  const textColor = isDark ? "text-white" : "text-neutral-950";

  const content = (
    <span className={`inline-flex items-center ${className}`}>
      <span
        className={`text-xl font-black tracking-tight ${textColor} transition-colors duration-200 group-hover:text-teal-500`}
      >
        {APP_NAME}
      </span>
    </span>
  );

  const ringOffset = isDark
    ? "focus-visible:ring-offset-neutral-950"
    : "focus-visible:ring-offset-white";
  const wrapClass = `group inline-flex rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 ${ringOffset}`;

  if (href) {
    return (
      <Link href={href} className={wrapClass}>
        {content}
      </Link>
    );
  }

  return <span className={`group inline-flex ${wrapClass}`}>{content}</span>;
}
