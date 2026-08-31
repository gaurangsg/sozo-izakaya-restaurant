import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a reachable phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Use digits, spaces or + only"),
  email: z.string().trim().max(255).email("Enter a valid email").or(z.literal("")),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  guests: z.string().min(1, "How many guests?"),
  occasion: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(500, "Keep notes under 500 characters").optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const fieldClass =
  "w-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
const labelClass = "block text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase";

export function Reserve() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<null | { name: string; date: string; time: string }>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form) as Record<string, string>;
    const parsed = schema.safeParse({ occasion: "", notes: "", email: "", ...raw });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const d = parsed.data;
    const message = [
      `Table request for ${site.fullName}`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email ? `Email: ${d.email}` : "",
      `Date: ${d.date} at ${d.time}`,
      `Guests: ${d.guests}`,
      d.occasion ? `Occasion: ${d.occasion}` : "",
      d.notes ? `Notes: ${d.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${site.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    setSent({ name: d.name, date: d.date, time: d.time });
    e.currentTarget.reset();
  }

  return (
    <section id="reserve" className="border-t border-border bg-card py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,0.85fr)_1fr]">
        <div>
          <p className="eyebrow">Book a table</p>
          <h2 className="font-display rule-red mt-4 text-4xl leading-tight md:text-5xl">
            Save your seat at the counter
          </h2>
          <p className="mt-7 leading-relaxed text-muted-foreground">
            Send us your details and our team confirms within 30 minutes during service hours.
            For parties of 12 or more, private dining or catering, add a note and we'll plan the
            menu with you.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 border border-border px-5 py-4 text-sm transition-colors hover:bg-secondary"
            >
              <Phone className="size-4 shrink-0 text-primary" />
              <span className="min-w-0 truncate">Call us — {site.phone}</span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-border px-5 py-4 text-sm transition-colors hover:bg-secondary"
            >
              <MessageCircle className="size-4 shrink-0 text-primary" />
              <span className="min-w-0 truncate">Message us on WhatsApp</span>
            </a>
          </div>
        </div>

        <div>
          {sent && (
            <div className="mb-6 flex items-start gap-3 border border-primary bg-background p-5">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm text-foreground">
                Thanks {sent.name} — your request for {sent.date} at {sent.time} is on its way.
                We'll confirm shortly. If WhatsApp didn't open, call us instead.
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="name">
                Name
              </label>
              <input id="name" name="name" maxLength={80} className={`${fieldClass} mt-2`} />
              {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                inputMode="tel"
                maxLength={20}
                className={`${fieldClass} mt-2`}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email <span className="normal-case">(optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                className={`${fieldClass} mt-2`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="date">
                Date
              </label>
              <input id="date" name="date" type="date" className={`${fieldClass} mt-2`} />
              {errors.date && <p className="mt-1.5 text-xs text-destructive">{errors.date}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="time">
                Time
              </label>
              <input id="time" name="time" type="time" className={`${fieldClass} mt-2`} />
              {errors.time && <p className="mt-1.5 text-xs text-destructive">{errors.time}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="guests">
                Guests
              </label>
              <select id="guests" name="guests" defaultValue="2" className={`${fieldClass} mt-2`}>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12+"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="occasion">
                Occasion
              </label>
              <select id="occasion" name="occasion" defaultValue="" className={`${fieldClass} mt-2`}>
                <option value="">Just dinner</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Private dining">Private dining</option>
                <option value="Corporate">Corporate / catering</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="notes">
                Notes <span className="normal-case">(allergies, seating, celebrations)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                maxLength={500}
                className={`${fieldClass} mt-2 resize-none`}
              />
              {errors.notes && <p className="mt-1.5 text-xs text-destructive">{errors.notes}</p>}
            </div>

            <button
              type="submit"
              className="bg-primary px-8 py-4 text-xs font-medium tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90 sm:col-span-2"
            >
              Request my table
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
