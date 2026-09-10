"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menuCategories } from "./data";
import CategoryNav from "./CategoryNav";
import ItemCard from "./ItemCard";
import CartPanel from "./CartPanel";

const NAVBAR_OFFSET = "72px";

export default function OurMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    menuCategories[0].id,
  );
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartHasItems = useMemo(
    () => Object.values(cart).some((qty) => qty > 0),
    [cart],
  );

  const activeCategory =
    menuCategories.find((c) => c.id === activeCategoryId) ?? menuCategories[0];

  const visibleItems = useMemo(() => {
    return activeCategory.items.filter((item) => {
      if (vegOnly && !nonVegOnly) return item.isVeg;
      if (nonVegOnly && !vegOnly) return !item.isVeg;
      return true;
    });
  }, [activeCategory, vegOnly, nonVegOnly]);

  const setQty = (itemId: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[itemId];
      } else {
        next[itemId] = qty;
      }
      return next;
    });
  };

  const headingWords = "See What's Cookin'".split(" ");

  return (
    <section className="relative overflow-hidden px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-40 top-25 h-30 w-140 rounded-full bg-red-400/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 800 }}
          className="relative px-6 py-14 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-red-600"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ·
            </motion.span>{" "}
            Our Menu
          </motion.span>

          <h1 className="mt-4 flex flex-wrap justify-center gap-x-4 text-4xl font-extrabold text-neutral-900 md:text-6xl">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "bottom", display: "inline-block" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.5,
              delay: 0.25 + headingWords.length * 0.12 + 0.2,
            }}
            className="mt-3 text-sm text-neutral-500"
          >
            *Our menu changes based on seasonality and availability
          </motion.p>
        </motion.div>

        <div className="flex gap-8">
          <div className="min-w-0 flex-1">
            <div className="sticky z-30" style={{ top: NAVBAR_OFFSET }}>
              <CategoryNav
                categories={menuCategories}
                activeCategoryId={activeCategoryId}
                onSelect={setActiveCategoryId}
                vegOnly={vegOnly}
                nonVegOnly={nonVegOnly}
                onToggleVeg={() => setVegOnly((v) => !v)}
                onToggleNonVeg={() => setNonVegOnly((v) => !v)}
              />
            </div>

            <motion.h2
              key={activeCategory.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 mt-6 text-2xl font-bold text-neutral-900"
            >
              {activeCategory.label}
            </motion.h2>

            <motion.div
              layout
              className="grid grid-cols-2 gap-5 pb-16 sm:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ItemCard
                      item={item}
                      quantity={cart[item.id] ?? 0}
                      onQuantityChange={(qty) => setQty(item.id, qty)}
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence>
            {cartHasItems && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="hidden w-[320px] shrink-0 lg:block"
              >
                <div className="sticky" style={{ top: NAVBAR_OFFSET }}>
                  <CartPanel
                    items={menuCategories.flatMap((c) => c.items)}
                    cart={cart}
                    onQuantityChange={setQty}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
