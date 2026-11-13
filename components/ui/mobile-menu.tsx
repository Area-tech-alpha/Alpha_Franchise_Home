"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { NavLink } from "@/lib/content";

export default function MobileMenu({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  // true só no cliente (o portal precisa do document.body).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label="Abrir menu"
        className="flex flex-col gap-[5px] p-2 lg:hidden"
      >
        <span className="h-0.5 w-[22px] rounded bg-white" />
        <span className="h-0.5 w-[22px] rounded bg-white" />
        <span className="h-0.5 w-[22px] rounded bg-white" />
      </button>

      {/* Portal: o header tem transform/backdrop-filter, que prenderiam o "fixed" a ele. */}
      {mounted &&
        createPortal(
          <nav
            id="menu-mobile"
            aria-label="Menu"
            inert={!open}
            className={`fixed inset-0 z-[1150] flex flex-col items-center justify-center gap-7 bg-[rgba(5,5,5,.98)] transition-transform duration-[450ms] ease-alpha lg:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Fechar menu"
              className="absolute top-6 right-[6%] p-2 text-white"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading text-[21px] font-semibold text-white"
              >
                {link.label}
              </a>
            ))}
            <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary">
              {cta.label}
            </a>
          </nav>,
          document.body
        )}
    </>
  );
}
