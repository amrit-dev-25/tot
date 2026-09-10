"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle, Triangle } from "lucide-react";
import { MenuCategory } from "./types";

type FoodFilter = "all" | "veg" | "non-veg";

type Props = {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
  foodFilter: FoodFilter;
  onFoodFilterChange: (value: FoodFilter) => void;
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onSelect,
  foodFilter,
  onFoodFilterChange,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex gap-2 sm:gap-3">
        <button
          aria-label="Scroll categories left"
          onClick={() => scrollByAmount(-240)}
          className="flex h-8 w-8 shrink-0 self-center items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="relative min-w-0 flex-1">
          <div
            ref={trackRef}
            className="flex items-start gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-10"
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
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{ scale: 0.94 }}
                  className="flex shrink-0 flex-col items-center gap-1.5 pt-2 sm:gap-2"
                >
                  <div className="relative h-14 w-14 sm:h-20 sm:w-20">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`inline-block whitespace-nowrap border-b-2 pb-2 text-xs font-semibold transition-colors sm:pb-3 sm:text-sm ${
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
          className="flex h-8 w-8 shrink-0 self-center items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 sm:h-10 sm:w-10"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Single 3-state veg / all / non-veg slider */}
      <div className="pl-2 sm:pl-[52px]">
        <FoodFilterToggle value={foodFilter} onChange={onFoodFilterChange} />
      </div>
    </div>
  );
}

function FoodFilterToggle({
  value,
  onChange,
}: {
  value: FoodFilter;
  onChange: (value: FoodFilter) => void;
}) {
  const positions: Record<FoodFilter, number> = { veg: 3, all: 41, "non-veg": 79 };

  const knobColor =
    value === "veg" ? "bg-green-600" : value === "non-veg" ? "bg-red-700" : "bg-white";

  const trackColor =
    value === "veg"
      ? "bg-green-100"
      : value === "non-veg"
        ? "bg-red-100"
        : "bg-neutral-200";

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`text-md font-semibold transition-colors ${
          value === "veg" ? "text-green-600" : "text-neutral-400"
        }`}
      >
        VEG
      </span>

      <div
        className={`relative h-9 w-[112px] shrink-0 rounded-full p-0.5 shadow-inner transition-colors duration-300 ${trackColor}`}
      >
        <motion.span
          animate={{ x: positions[value] }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={`absolute top-1 h-7 w-7 rounded-full shadow-md transition-colors duration-300 ${knobColor}`}
        />

        <button
          type="button"
          aria-label="Show vegetarian items only"
          aria-pressed={value === "veg"}
          onClick={() => onChange(value === "veg" ? "all" : "veg")}
          className="absolute top-0 z-10 flex h-9 w-9 items-center justify-center"
        >
          <Circle
            size={13}
            className={value === "veg" ? "text-white" : "text-green-600"}
            fill="currentColor"
          />
        </button>

        <button
          type="button"
          aria-label="Show all items"
          aria-pressed={value === "all"}
          onClick={() => onChange("all")}
          className="absolute top-0 z-10 flex h-9 w-9 items-center justify-center"
          style={{ left: 38 }}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              value === "all" ? "bg-white" : "bg-neutral-400"
            }`}
          />
        </button>

        <button
          type="button"
          aria-label="Show non-vegetarian items only"
          aria-pressed={value === "non-veg"}
          onClick={() => onChange(value === "non-veg" ? "all" : "non-veg")}
          className="absolute top-0 z-10 flex h-9 w-9 items-center justify-center"
          style={{ left: 76 }}
        >
          <Triangle
            size={13}
            className={value === "non-veg" ? "text-white" : "text-red-700"}
            fill="currentColor"
          />
        </button>
      </div>

      <span
        className={`text-md font-semibold transition-colors ${
          value === "non-veg" ? "text-red-700" : "text-neutral-400"
        }`}
      >
        NON-VEG
      </span>
    </div>
  );
}