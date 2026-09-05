import { MapPin, Clock } from "lucide-react";
import heroImg from "@/assets/hero-ramen.jpg";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Steaming bowl of tonkotsu ramen on the Sozo counter"
        width={1600}
        height={1200}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="veil absolute inset-0" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pt-32 pb-16 md:px-8 md:pb-24">
        <p className="eyebrow">Versova · West Andhery · Mumbai</p>
        <h1 className="wordmark mt-5 text-6xl leading-none text-foreground sm:text-8xl md:text-[9rem]">
          Sozo
        </h1>
        <p className="font-display mt-4 max-w-xl text-2xl leading-snug text-foreground/90 md:text-3xl">
          {site.tagline} — served the way an izakaya should feel: warm, loud, unhurried.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#reserve"
            className="bg-primary px-8 py-4 text-center text-xs font-medium tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Reserve a table
          </a>
          <a
            href="#menu"
            className="border border-border px-8 py-4 text-center text-xs font-medium tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-secondary"
          >
            See the menu
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" />
            Aram Nagar, Versova
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-primary" />
            Open daily, 12 pm till late
          </span>
        </div>
      </div>
    </section>
  );
}
