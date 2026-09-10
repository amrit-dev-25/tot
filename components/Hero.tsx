"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/1-hero.png",
    mobileImage: "/m-1-hero.png",
    alt: "Wednesday deal — buy 1 get 1 free burger promotion",
  },
  {
    image: "/2-hero.png",
    mobileImage: "/m-2-hero.png",
    alt: "New loaded double cheeseburger launch",
  },
  {
    image: "/3-hero.png",
    mobileImage: "/m-3-hero.png",
    alt: "Weekend combo offer — burger, fries and drink",
  },
];

const stats = [
  { label: "Fast Delivery", sub: "At your doorstep", icon: "🛵" },
  { label: "Fresh Ingredients", sub: "100% Natural", icon: "🥬" },
  { label: "4.9 Rating", sub: "From 10K+ Customers", icon: "⭐" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-4 py-6 md:px-4 md:py-6">
      <div className="mx-auto max-w-8xl">
        {/* Poster carousel — each slide is a complete creative, no text overlay */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg md:aspect-[21/9]">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              {/* Mobile crop — shown below md */}
              <Image
                src={slide.mobileImage}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover md:hidden"
              />
              {/* Desktop/wide crop — shown at md and up */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="hidden object-cover md:block"
              />
            </div>
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-5 right-5 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-orange-500" : "w-2 bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}