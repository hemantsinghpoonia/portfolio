"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blog", label: "Blog ↗", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(enabled ? "hero" : null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function Sidebar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isBlogRoute = pathname?.startsWith("/blog") ?? false;

  const scrollActive = useActiveSection(isHomepage);

  // On the homepage: highlight whichever section is in view.
  // On any /blog route: highlight "Blog" by route, ignore scroll position.
  // Anywhere else: nothing highlighted.
  const active = isHomepage ? scrollActive : isBlogRoute ? "blog" : null;

  return (
    <nav className="site-sidebar">
      <div className="flex flex-col items-center lg:items-start">
        <Link
          href="/#hero"
          className="font-heading text-headline-md font-semibold text-foreground block mb-14 lg:mb-16 text-center lg:text-left"
        >
          HS
        </Link>
        <ul className="space-y-7 lg:space-y-8 w-full">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <Link
                href={id === "blog" ? "/blog" : `/#${id}`}
                className={`nav-link text-body-md flex items-center justify-center lg:justify-start gap-0 lg:gap-4 transition-colors w-full ${
                  active === id
                    ? "nav-link-active"
                    : "text-muted-foreground hover:text-brand-strong"
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-muted-foreground text-xs lg:text-sm text-label-sm text-center lg:text-left">
        © {new Date().getFullYear()} Hemant Singh
      </div>
    </nav>
  );
}
