import Image from "next/image";
import { MenuItem } from "./types";

type Props = {
  items: MenuItem[];
  cart: Record<string, number>;
  onQuantityChange: (itemId: string, quantity: number) => void;
};

export default function CartPanel({ items, cart, onQuantityChange }: Props) {
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      item: items.find((i) => i.id === id),
      qty,
    }))
    .filter(
      (entry): entry is { item: MenuItem; qty: number } =>
        !!entry.item && entry.qty > 0,
    );

  const subtotal = cartItems.reduce(
    (sum, { item, qty }) => sum + item.price * qty,
    0,
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return (
    <aside className="flex max-h-[calc(100vh-96px)] w-[320px] flex-col rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">My Order</h3>
        <span className="text-sm text-neutral-400">
          {cartItems.length} positions
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
        {cartItems.map(({ item, qty }) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-neutral-100 p-3"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">
                {item.name}
              </p>
              <p className="text-xs font-semibold text-orange-600">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-2 py-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => onQuantityChange(item.id, Math.max(0, qty - 1))}
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                −
              </button>
              <span className="w-3 text-center text-xs font-medium">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => onQuantityChange(item.id, qty + 1)}
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-dashed border-neutral-200 pt-4 text-sm">
        <div className="flex justify-between text-neutral-500">
          <span>DISCOUNT</span>
          <span>-10%</span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>DELIVERY</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-neutral-900">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="mt-4 rounded-full bg-red-500 py-3.5 text-sm font-semibold text-white hover:bg-red-600">
        Confirm Order
      </button>
    </aside>
  );
}
