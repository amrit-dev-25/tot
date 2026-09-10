"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { menuCategories } from "./data";
import CategoryNav from "./CategoryNav";
import ItemCard from "./ItemCard";
import CartPanel from "./CartPanel";

const NAVBAR_OFFSET = "72px";
const headingWords = "See What's Cookin'".split(" ");

type FoodFilter = "all" | "veg" | "non-veg";

export default function OurMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    menuCategories[0].id,
  );
  const [foodFilter, setFoodFilter] = useState<FoodFilter>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const allItems = useMemo(() => menuCategories.flatMap((c) => c.items), []);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  );
  const cartHasItems = cartCount > 0;

  const activeCategory =
    menuCategories.find((c) => c.id === activeCategoryId) ?? menuCategories[0];

  const visibleItems = useMemo(() => {
    return activeCategory.items.filter((item) => {
      if (foodFilter === "veg") return item.isVeg;
      if (foodFilter === "non-veg") return !item.isVeg;
      return true;
    });
  }, [activeCategory, foodFilter]);

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

  // Close the mobile sheet automatically if the cart empties out
  const handleQtyChange = (itemId: string, qty: number) => {
    setQty(itemId, qty);
    if (qty <= 0 && cartCount <= 1) setMobileCartOpen(false);
  };

  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 md:px-10">
      <div className="pointer-events-none absolute -left-40 top-25 h-30 w-[220px] rounded-full bg-red-400/50 blur-3xl sm:w-140" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-52 w-52 rounded-full bg-amber-200/40 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 800 }}
          className="relative px-2 py-8 text-center sm:px-6 sm:py-14"
        >
          <motion.span
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600 sm:px-4 sm:py-1.5 sm:text-xs"
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

          <h1 className="mt-3 flex flex-wrap justify-center gap-x-2 text-3xl font-extrabold text-neutral-900 sm:mt-4 sm:gap-x-4 sm:text-4xl md:text-6xl">
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
            className="mt-2 px-4 text-xs text-neutral-500 sm:mt-3 sm:px-0 sm:text-sm"
          >
            *Our menu changes based on seasonality and availability
          </motion.p>
        </motion.div>

        <div className="flex gap-8">
          <div className="min-w-0 flex-1">
            <div
              className="sticky z-30 -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ top: NAVBAR_OFFSET }}
            >
              <CategoryNav
                categories={menuCategories}
                activeCategoryId={activeCategoryId}
                onSelect={setActiveCategoryId}
                foodFilter={foodFilter}
                onFoodFilterChange={setFoodFilter}
              />
            </div>

            <motion.h2
              key={activeCategory.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 mt-5 text-xl font-bold text-neutral-900 sm:mb-5 sm:mt-6 sm:text-2xl"
            >
              {activeCategory.label}
            </motion.h2>

            <motion.div
              layout
              className="grid grid-cols-2 gap-3 pb-24 sm:grid-cols-3 sm:gap-5 sm:pb-16 lg:grid-cols-4"
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
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Desktop cart — unchanged, just hidden below lg */}
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
                    items={allItems}
                    cart={cart}
                    onQuantityChange={setQty}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / tablet floating cart trigger */}
      <AnimatePresence>
        {cartHasItems && !mobileCartOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setMobileCartOpen(true)}
            className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-2xl bg-neutral-900 px-5 py-3.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] lg:hidden"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <ShoppingBag size={18} />
              View cart
            </span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-neutral-900">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile / tablet cart bottom sheet */}
      <AnimatePresence>
        {mobileCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-4 lg:hidden"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-base font-bold text-neutral-900">
                  Your cart
                </span>
                <button
                  aria-label="Close cart"
                  onClick={() => setMobileCartOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600"
                >
                  <X size={16} />
                </button>
              </div>
              <CartPanel
                items={allItems}
                cart={cart}
                onQuantityChange={handleQtyChange}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
