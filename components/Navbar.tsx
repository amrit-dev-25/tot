"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Store,
  Percent,
  User,
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
} from "lucide-react";

const navItems = [
  { label: "Nearby Stores", icon: Store, href: "#stores" },
  { label: "Offers", icon: Percent, href: "#offers" },
  { label: "Login", icon: User, href: "#login" },
  { label: "Cart", icon: ShoppingBag, href: "#cart" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState(true);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-8xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <div className="relative h-10 w-40">
            <Image
              src="/TOT-LOGO.png"
              alt="Burger House"
              fill
              sizes="160px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Delivery / Dine-in toggle + store locator — desktop only */}
        <div className="hidden min-w-0 flex-1 items-center gap-4 md:flex">
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`text-sm font-bold uppercase tracking-wide ${
                delivery ? "text-red-600" : "text-neutral-400"
              }`}
            >
              Delivery
            </span>
            <button
              role="switch"
              aria-checked={delivery}
              aria-label="Toggle delivery or dine-in"
              onClick={() => setDelivery((v) => !v)}
              className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                delivery ? "bg-red-500" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  delivery ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-bold uppercase tracking-wide ${
                !delivery ? "text-orange-600" : "text-neutral-400"
              }`}
            >
              Dine-in
            </span>
          </div>

          <button className="flex min-w-0 flex-1 items-center gap-2 truncate rounded-full bg-neutral-100 px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-200">
            <MapPin size={16} className="shrink-0 text-orange-600" />
            <span className="truncate">No stores nearby</span>
          </button>
        </div>

        {/* Right side: icon nav + search + hamburger */}
        <div className="flex shrink-0 items-center gap-6">
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-neutral-600 transition-colors hover:text-orange-600"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Search"
            className="hidden text-neutral-700 transition-colors hover:text-orange-600 lg:inline-flex"
          >
            <Search size={20} />
          </button>

          {/* Hamburger toggle — mobile/tablet only */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-900 lg:hidden"
          >
            {open ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden">
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`text-sm font-bold uppercase tracking-wide ${
                delivery ? "text-orange-600" : "text-neutral-400"
              }`}
            >
              Delivery
            </span>
            <button
              role="switch"
              aria-checked={delivery}
              aria-label="Toggle delivery or dine-in"
              onClick={() => setDelivery((v) => !v)}
              className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                delivery ? "bg-orange-500" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  delivery ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-bold uppercase tracking-wide ${
                !delivery ? "text-orange-600" : "text-neutral-400"
              }`}
            >
              Dine-in
            </span>
          </div>

          <button className="mb-4 flex w-full items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-left text-sm text-neutral-700">
            <MapPin size={16} className="shrink-0 text-orange-600" />
            <span className="truncate">No stores nearby</span>
          </button> 

          <nav className="flex flex-col gap-4">
            {navItems.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[15px] font-semibold text-neutral-700 transition-colors hover:text-orange-600"
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}