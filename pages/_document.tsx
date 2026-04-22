import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document Component for Pages Router
 * Defines the HTML document structure
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex min-h-screen flex-col bg-white font-sans text-neutral-950 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
