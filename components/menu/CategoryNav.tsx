"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle, Triangle } from "lucide-react";
import { MenuCategory } from "./types";

type Props = {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
  vegOnly: boolean;
  nonVegOnly: boolean;
  onToggleVeg: () => void;
  onToggleNonVeg: () => void;
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onSelect,
  vegOnly,
  nonVegOnly,
  onToggleVeg,
  onToggleNonVeg,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex gap-3">
        <button
          aria-label="Scroll categories left"
          onClick={() => scrollByAmount(-240)}
          className="flex h-10 w-10 shrink-0 self-center items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="relative min-w-0 flex-1">
          <div
            ref={trackRef}
            className="flex items-start gap-10 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, index) => {
              const active = category.id === activeCategoryId;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => onSelect(category.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{ scale: 0.94 }}
                  className="flex shrink-0 flex-col items-center gap-2 pt-2"
                >
                  <div className="relative h-20 w-20">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`inline-block whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition-colors ${
                      active
                        ? "border-orange-500 text-neutral-900"
                        : "border-transparent text-neutral-500"
                    }`}
                  >
                    {category.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-0.5 bg-neutral-300" />
        </div>

        <button
          aria-label="Scroll categories right"
          onClick={() => scrollByAmount(240)}
          className="flex h-10 w-10 shrink-0 self-center items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Veg / non-veg filters — independent toggles, not a radio choice */}
      <div className="flex items-center gap-3 pl-[52px]">
        <VegToggle active={vegOnly} onClick={onToggleVeg} variant="veg" />
        <VegToggle
          active={nonVegOnly}
          onClick={onToggleNonVeg}
          variant="non-veg"
        />
      </div>
    </div>
  );
}

function VegToggle({
  active,
  onClick,
  variant,
}: {
  active: boolean;
  onClick: () => void;
  variant: "veg" | "non-veg";
}) {
  const borderColor = variant === "veg" ? "border-green-600" : "border-red-700";
  const iconColor = variant === "veg" ? "text-green-600" : "text-red-700";
  const Icon = variant === "veg" ? Circle : Triangle;

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={
        variant === "veg"
          ? "Show vegetarian items only"
          : "Show non-vegetarian items only"
      }
      className={`relative flex h-8 w-16 shrink-0 items-center rounded-full border-2 bg-white/40 backdrop-blur-md transition-colors ${borderColor}`}
    >
      <motion.span
        animate={{ x: active ? 34 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white"
      >
        <Icon size={14} className={iconColor} fill="currentColor" />
      </motion.span>
    </button>
  );
}
