import interiorImg from "@/assets/interior.jpg";
import { site } from "@/data/site";

const stats = [
  { value: "12 hrs", label: "Broth simmered daily" },
  { value: "40", label: "Seats, counter & booths" },
  { value: "4–7 pm", label: "Weekday happy hours" },
];

export function Story() {
  return (
    <section id="story" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <img
          src={interiorImg}
          alt="Warm, low-lit interior of Sozo Izakaya with bamboo blinds and booth seating"
          loading="lazy"
          width={1400}
          height={1000}
          className="lift w-full object-cover"
        />

        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="font-display rule-red mt-4 text-4xl leading-tight md:text-5xl">
            {site.jp}
          </h2>
          <p className="mt-7 leading-relaxed text-muted-foreground">
            Sozo began with a simple idea — the Japanese neighbourhood izakaya, translated for
            Mumbai. A place you drop into after work, order three small plates and one big bowl,
            and stay two hours longer than you planned.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our kitchen pulls noodles fresh each morning, simmers broth overnight, and cuts sushi
            to order at the counter. The baoger — our burger folded into a steamed bao — is the
            dish people come back for. Everything is built to share.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-primary">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
