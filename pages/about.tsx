import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { APP_NAME } from "@/lib/constants";

/**
 * About Page
 * Company information and values
 */
export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide customers with the best online shopping experience through quality products, competitive prices, and exceptional service.",
    },
    {
      icon: Users,
      title: "Our Team",
      description:
        "A dedicated group of professionals committed to curating the finest products and delivering outstanding customer satisfaction.",
    },
    {
      icon: Award,
      title: "Our Standards",
      description:
        "We maintain the highest standards in product quality, authenticity, and customer service to ensure your complete satisfaction.",
    },
    {
      icon: Heart,
      title: "Our Promise",
      description:
        "We promise transparency, reliability, and dedication to making your shopping experience seamless and enjoyable every time.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 px-4 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About {APP_NAME}</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We're more than just an online store. We're your trusted partner in
            discovering quality products that enhance your lifestyle.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-neutral-600 mb-4">
              Founded with a vision to revolutionize online shopping, {APP_NAME}{" "}
              has grown from a small startup to a trusted destination for
              customers worldwide. Our journey began with a simple belief:
              everyone deserves access to quality products at fair prices.
            </p>
            <p className="text-neutral-600 mb-4">
              Today, we're proud to serve thousands of satisfied customers
              across the globe. Our commitment to excellence drives everything
              we do, from carefully selecting our product range to ensuring
              smooth delivery and providing responsive customer support.
            </p>
            <p className="text-neutral-600">
              As we continue to grow, our focus remains unchanged: putting our
              customers first and delivering an exceptional shopping experience
              every single time.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-50 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-neutral-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <value.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "2020", label: "Founded" },
              { value: "50k+", label: "Happy Customers" },
              { value: "10k+", label: "Products" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
