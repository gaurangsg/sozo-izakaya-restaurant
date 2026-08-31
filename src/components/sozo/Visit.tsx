import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

export function Visit() {
  return (
    <section id="visit" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow">Visit us</p>
        <h2 className="font-display rule-red mt-4 text-4xl leading-tight md:text-5xl">
          Find us in Versova
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Address
              </h3>
              <p className="mt-3 leading-relaxed text-foreground">{site.address}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <MapPin className="size-4" /> Get directions
              </a>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Hours
              </h3>
              <dl className="mt-3">
                {site.hours.map((h) => (
                  <div
                    key={h.day}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border py-3 text-sm"
                  >
                    <dt className="min-w-0 text-muted-foreground">{h.day}</dt>
                    <dd className="shrink-0 text-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Contact
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Phone className="size-4 shrink-0 text-primary" /> {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" /> {site.email}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Instagram className="size-4 shrink-0 text-primary" /> @sozoizakaya
                </a>
              </div>
            </div>
          </div>

          <div className="lift min-h-80 border border-border">
            <iframe
              title="Map showing Sozo Izakaya in Versova, Mumbai"
              src="https://www.google.com/maps?q=Sozo%20Izakaya%20Versova%20Mumbai&output=embed"
              loading="lazy"
              className="size-full min-h-80"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-8">
        <div className="min-w-0">
          <span className="wordmark text-2xl text-foreground">{site.name}</span>
          <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.address}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sozo Izakaya, Versova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
