import { useState } from "react";
import { menu } from "@/data/site";
import sushiImg from "@/assets/dish-sushi.jpg";
import baogerImg from "@/assets/dish-baoger.jpg";
import dimsumImg from "@/assets/dish-dimsum.jpg";
import drinksImg from "@/assets/drinks.jpg";
import ramenImg from "@/assets/hero-ramen.jpg";

const images: Record<string, string> = {
  ramen: ramenImg,
  sushi: sushiImg,
  baogers: baogerImg,
  "small-plates": dimsumImg,
  drinks: drinksImg,
};

export function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const section = menu.find((m) => m.id === active) ?? menu[0];

  return (
    <section id="menu" className="border-t border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow">The menu</p>
        <h2 className="font-display rule-red mt-4 text-4xl leading-tight md:text-5xl">
          Ramens, sushi, baogers and more
        </h2>

        <div className="mt-12 flex flex-wrap gap-2">
          {menu.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(m.id)}
              className={`px-5 py-2.5 text-xs font-medium tracking-[0.16em] uppercase transition-colors ${
                m.id === active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,0.8fr)] lg:items-start">
          <div>
            <p className="font-display text-2xl text-foreground/85">{section.blurb}</p>
            <ul className="mt-8">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border py-5"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="font-display shrink-0 text-xl text-accent">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Prices in INR, exclusive of taxes. Vegetarian options marked (V). Ask our team about
              allergens — kitchens handle shellfish, gluten and nuts.
            </p>
          </div>

          <img
            src={images[section.id]}
            alt={`${section.name} at Sozo Izakaya`}
            loading="lazy"
            width={1024}
            height={1024}
            className="lift aspect-square w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
