export const site = {
  name: "Sozo",
  fullName: "Sozo Izakaya — Versova",
  tagline: "ramens, sushi, baogers and more",
  jp: "साझा · comfort izakaya",
  address: "Aram Nagar, Versova, Andheri West, Mumbai 400061",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sozo+Izakaya+Versova",
  phone: "+91 90960 01994",
  phoneHref: "tel:+919096001994",
  whatsappHref: "https://wa.me/919096001994",
  email: "hello@sozoizakaya.in",
  instagram: "https://www.instagram.com/",
  hours: [
    { day: "Monday – Thursday", time: "12:00 pm – 11:30 pm" },
    { day: "Friday – Saturday", time: "12:00 pm – 1:00 am" },
    { day: "Sunday", time: "12:00 pm – 11:30 pm" },
  ],
};

export const menu = [
  {
    id: "ramen",
    name: "Ramen",
    blurb: "Broths simmered for 12 hours, noodles pulled fresh each morning.",
    items: [
      { name: "Tonkotsu Classic", desc: "Pork bone broth, chashu, ajitama, nori", price: "₹640" },
      { name: "Spicy Miso Chicken", desc: "Red miso, chilli oil, sweet corn, scallion", price: "₹590" },
      { name: "Shoyu Mushroom (V)", desc: "Soy-dashi, shiitake, bamboo shoot, greens", price: "₹520" },
      { name: "Black Garlic Tantanmen", desc: "Sesame, minced pork, mayu, bok choy", price: "₹660" },
    ],
  },
  {
    id: "sushi",
    name: "Sushi & Maki",
    blurb: "Cut to order at the counter, rice seasoned in small batches.",
    items: [
      { name: "Salmon Nigiri (4 pc)", desc: "Torched or fresh, yuzu salt", price: "₹520" },
      { name: "Spicy Tuna Maki (8 pc)", desc: "Tuna, sriracha mayo, cucumber, tobiko", price: "₹580" },
      { name: "Dragon Roll (8 pc)", desc: "Prawn tempura, avocado, unagi glaze", price: "₹690" },
      { name: "Avocado Garden Roll (V)", desc: "Asparagus, cream cheese, sesame", price: "₹460" },
    ],
  },
  {
    id: "baogers",
    name: "Baogers",
    blurb: "Our signature: the burger, rebuilt inside a pillowy steamed bao.",
    items: [
      { name: "Karaage Baoger", desc: "Fried chicken, kewpie slaw, pickled beet", price: "₹420" },
      { name: "Pork Belly Baoger", desc: "Braised belly, hoisin, peanut, coriander", price: "₹460" },
      { name: "Tofu Katsu Baoger (V)", desc: "Panko tofu, tonkatsu sauce, cabbage", price: "₹380" },
      { name: "Baoger Trio", desc: "One of each — best for sharing", price: "₹1,140" },
    ],
  },
  {
    id: "small-plates",
    name: "Small Plates & Dim Sum",
    blurb: "The heart of an izakaya — plates made to be passed around.",
    items: [
      { name: "Chicken Gyoza (6 pc)", desc: "Pan-seared, black vinegar dip", price: "₹390" },
      { name: "Edamame, Two Ways", desc: "Sea salt or garlic-butter chilli", price: "₹260" },
      { name: "Prawn Har Gow (4 pc)", desc: "Steamed, crystal skin, ginger soy", price: "₹430" },
      { name: "Chilli Garlic Wontons (V)", desc: "Sichuan oil, crushed peanut", price: "₹340" },
    ],
  },
  {
    id: "drinks",
    name: "Bar & Sips",
    blurb: "Highballs, sake and a matcha list for the sober-curious.",
    items: [
      { name: "Yuzu Highball", desc: "Whisky, yuzu, soda, shiso", price: "₹520" },
      { name: "Sake Flight", desc: "Three pours, junmai to nigori", price: "₹780" },
      { name: "Iced Matcha Cooler", desc: "Ceremonial matcha, lime, mint", price: "₹320" },
      { name: "Umeshu Spritz", desc: "Plum wine, sparkling, orange peel", price: "₹480" },
    ],
  },
];

export const services = [
  {
    title: "Dine-in at the counter",
    desc: "Forty seats, bamboo blinds and low light. Walk-ins welcome, tables held 15 minutes.",
  },
  {
    title: "Order online & delivery",
    desc: "Ramen packed to travel with broth and noodles kept apart, plus contactless pickup.",
  },
  {
    title: "Private dining & celebrations",
    desc: "Reserve the back room for 12–30 guests with a set izakaya menu.",
  },
  {
    title: "Corporate & event catering",
    desc: "Sushi platters, bao bars and dim sum trays delivered across the western suburbs.",
  },
  {
    title: "Chef's omakase counter",
    desc: "Seven courses, Thursday to Sunday evenings. Six seats per sitting.",
  },
  {
    title: "Happy hours, 4–7 pm",
    desc: "One-plus-one on highballs, sake and small plates, every weekday.",
  },
];
