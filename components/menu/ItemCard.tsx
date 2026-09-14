"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "./types";

type Props = {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  index?: number;
};

export default function ItemCard({ item, quantity, onQuantityChange, index = 0 }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-red-800 to-neutral-950 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      {/* Image */}
      <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-neutral-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 220px, 45vw"
          className="object-cover"
        />

        {/* Veg / non-veg indicator */}
        <span
          className={`absolute left-2 top-2 flex h-4 w-4 items-center justify-center rounded-sm border-2 bg-white ${
            item.isVeg ? "border-green-600" : "border-red-700"
          }`}
        >
          {item.isVeg ? (
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          ) : (
            <span className="h-0 w-0 border-x-[3px] border-b-[5px] border-x-transparent border-b-red-700" />
          )}
        </span>

        {/* Floating add / quantity control — moved below, commented out here */}
        {/* {quantity > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-neutral-900/90 px-2 py-1 backdrop-blur"
          >
            <button
              aria-label="Decrease quantity"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              className="flex h-5 w-5 items-center justify-center text-sm font-bold text-white"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-semibold text-white">
              {quantity}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => onQuantityChange(quantity + 1)}
              className="flex h-5 w-5 items-center justify-center text-sm font-bold text-white"
            >
              +
            </button>
          </motion.div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.85 }}
            aria-label="Add item"
            onClick={() => onQuantityChange(1)}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/90 text-lg font-bold text-white backdrop-blur"
          >
            +
          </motion.button>
        )} */}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-2 pb-2 pt-3 text-center">
        <h3 className="text-base font-bold text-white">{item.name}</h3>

        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs text-neutral-400">
            {item.description}
          </p>
        )}

        {/* Price (left) + Add to cart (right) */}
        <div className="mt-3 flex w-full items-center justify-between gap-2">
          <p className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-bold text-black">
            ${item.price}
          </p>

          {quantity > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex shrink-0 items-center gap-1 rounded-full bg-white px-1.5 py-1"
            >
              <button
                aria-label="Decrease quantity"
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                className="flex h-4 w-4 items-center justify-center text-xs font-bold text-black"
              >
                −
              </button>
              <span className="w-3 text-center text-xs font-semibold text-black">
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() => onQuantityChange(quantity + 1)}
                className="flex h-4 w-4 items-center justify-center text-xs font-bold text-black"
              >
                +
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.85 }}
              aria-label="Add item"
              onClick={() => onQuantityChange(1)}
              className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-bold text-black"
            >
              Add
            </motion.button>
          )}
        </div>

        {/* Macros — commented out for now
        {item.macros && (
          <div className="mt-3 flex w-full gap-2">
            <MacroBadge value={item.macros.cals} label="Cals" />
            <MacroBadge value={item.macros.carbs} label="Carbs" />
            <MacroBadge value={item.macros.protein} label="Protein" />
          </div>
        )}
        */}
      </div>
    </div>
  );
}

function MacroBadge({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-xl bg-neutral-800 py-2">
      <span className="text-sm font-bold text-white">{value}</span>
      <span className="text-[10px] text-neutral-400">{label}</span>
    </div>
  );
}