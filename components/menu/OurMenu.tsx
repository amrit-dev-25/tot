"use client";

import { useMemo, useState } from "react";
import { menuCategories } from "./data";
import CategoryNav from "./CategoryNav";
import ItemCard from "./ItemCard";
import CartPanel from "./CartPanel";

// Adjust this to match your actual Navbar height — the category tray
// and cart panel both stick to this offset once you scroll to them.
const NAVBAR_OFFSET = "72px";

export default function OurMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    menuCategories[0].id
  );
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartHasItems = useMemo(
    () => Object.values(cart).some((qty) => qty > 0),
    [cart]
  );

  const activeCategory =
    menuCategories.find((c) => c.id === activeCategoryId) ??
    menuCategories[0];

  const visibleItems = useMemo(() => {
    return activeCategory.items.filter((item) => {
      if (vegOnly && !nonVegOnly) return item.isVeg;
      if (nonVegOnly && !vegOnly) return !item.isVeg;
      return true; // neither or both toggled — show everything
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 py-10 md:px-10">
      {/* Decorative blurred backdrop — gives the glass cards something to blur over */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-red-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <h1 className="mb-6 text-center text-red-500 text-3xl  font-extrabold uppercase tracking-wide text-neutral-900 md:text-4xl">
          Menu
        </h1>

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

            <h2 className="mb-5 mt-6 text-2xl font-bold text-neutral-900">
              {activeCategory.label}
            </h2>

            <div className="grid grid-cols-2 gap-5 pb-16 sm:grid-cols-3 lg:grid-cols-4">
              {visibleItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] ?? 0}
                  onQuantityChange={(qty) => setQty(item.id, qty)}
                />
              ))}
            </div>
          </div>

          {cartHasItems && (
            <div className="hidden w-[320px] shrink-0 lg:block">
              <div className="sticky" style={{ top: NAVBAR_OFFSET }}>
                <CartPanel
                  items={menuCategories.flatMap((c) => c.items)}
                  cart={cart}
                  onQuantityChange={setQty}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}