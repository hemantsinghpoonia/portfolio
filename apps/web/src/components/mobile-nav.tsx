"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "hero", label: "Home", href: "/#hero" },
  { id: "about", label: "About", href: "/#about" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "blog", label: "Blog ↗", href: "/blog" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="mobile-topbar md:hidden">
        <Link
          href="/#hero"
          className="font-heading text-headline-md font-semibold text-foreground"
        >
          HS
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="mobile-menu-sheet md:hidden">
          <ul className="space-y-8 text-center">
            {SECTIONS.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="font-heading text-headline-md text-foreground hover:text-brand-strong transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
