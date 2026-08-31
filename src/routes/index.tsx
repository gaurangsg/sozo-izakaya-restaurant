import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sozo/Nav";
import { Hero } from "@/components/sozo/Hero";
import { Services } from "@/components/sozo/Services";
import { MenuSection } from "@/components/sozo/MenuSection";
import { Story } from "@/components/sozo/Story";
import { Reserve } from "@/components/sozo/Reserve";
import { Visit, Footer } from "@/components/sozo/Visit";
import { site } from "@/data/site";

const title = "Sozo Izakaya Versova | Ramen, Sushi & Baogers in Mumbai";
const description =
  "Sozo is a comfort izakaya in Versova, Andheri West — 12-hour ramen broths, counter-cut sushi and signature baogers. Reserve a table or order online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: site.fullName,
          servesCuisine: ["Japanese", "Ramen", "Sushi", "Asian"],
          priceRange: "₹₹",
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Aram Nagar, Versova",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400061",
            addressCountry: "IN",
          },
          openingHours: ["Mo-Th 12:00-23:30", "Fr-Sa 12:00-01:00", "Su 12:00-23:30"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Services />
        <MenuSection />
        <Story />
        <Reserve />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
