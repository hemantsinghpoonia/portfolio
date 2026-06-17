"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="mobile-topbar md:hidden">
        <Link href="/#hero" className="font-heading text-headline-md font-semibold text-foreground">
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
          <Card className="mx-4 w-[calc(100%-2rem)] max-w-sm text-center">
            <ul className="space-y-8 text-center">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    className="font-heading text-headline-md text-foreground hover:text-brand-strong transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </>
  );
}
