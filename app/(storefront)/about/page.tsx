import { APP_NAME, ANIMATION_DELAYS } from "@/lib/constants";

/**
 * About Page
 * Displays company mission, vision, and values in a card grid
 */
export default function AboutPage() {
  const companyInfoBlocks = [
    {
      title: "Our Mission",
      body: "To provide our customers with exceptional products that enhance their daily lives. We believe in quality over quantity and customer satisfaction above all else.",
    },
    {
      title: "Our Vision",
      body: "To become your trusted destination for premium products. We're building a shopping experience that's transparent, reliable, and always puts you first.",
    },
    {
      title: "Our Values",
      body: "Quality craftsmanship, honest pricing, and outstanding service. We respect your time and trust, which is why we carefully curate every product in our catalog.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="yh-animate-up text-xs font-semibold uppercase tracking-[0.35em] text-teal-600">
          About Us
        </p>
        <h1 className="yh-animate-up yh-delay-1 mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
          Welcome to {APP_NAME}
        </h1>
        <p className="yh-animate-up yh-delay-2 mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
          We're passionate about bringing you the best products at great prices.
          Our team works hard to ensure every item meets our high standards for
          quality and value.
        </p>
      </div>

      {/* Info cards grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {companyInfoBlocks.map((infoBlock, index) => (
          <div
            key={infoBlock.title}
            className={`rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-neutral-950 hover:shadow-lg yh-animate-up ${
              ANIMATION_DELAYS[index] || ""
            }`}
          >
            <h3 className="text-lg font-bold text-neutral-950">
              {infoBlock.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {infoBlock.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
