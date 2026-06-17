import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[70vh] flex flex-col justify-center mb-32 relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <p className="section-kicker">Hello, I&apos;m</p>
          <h1 className="font-heading text-display-xl text-foreground">
            Hemant Singh_
          </h1>
          <h2 className="font-heading text-headline-lg text-brand-strong">
            Backend &amp; Full-Stack Engineer
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mt-6">
            I build scalable web applications with clean code and thoughtful
            user experiences.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 pt-4">
            <Button asChild variant="main" className="px-6 py-3 h-auto">
              <Link href="#projects">
                View Projects <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 h-auto">
              <a href="/resume.pdf" download>
                Download Resume <Download size={16} />
              </a>
            </Button>
          </div>
        </div>

        <div className="md:col-span-5 mt-12 md:mt-0 relative">
          <DecorativeTexture />

          <div className="code-window relative">
            <div className="code-window__chrome">
              <div className="code-window__dot code-window__dot--red" />
              <div className="code-window__dot code-window__dot--yellow" />
              <div className="code-window__dot code-window__dot--green" />
            </div>
            <div className="font-mono text-sm leading-relaxed py-2">
              <p>
                <span className="code-token-keyword">const</span>{" "}
                <span className="code-token-property">status</span> = {"{"}
              </p>
              <p className="pl-4">
                lookingFor:{" "}
                <span className="code-token-string">
                  &quot;Full-Stack / Backend Roles&quot;
                </span>
                ,
              </p>
              <p className="pl-4">
                stack: [
                <span className="code-token-string">&quot;Next.js&quot;</span>,{" "}
                <span className="code-token-string">&quot;Node.js&quot;</span>,{" "}
                <span className="code-token-string">&quot;MERN&quot;</span>],
              </p>
              <p className="pl-4">
                focus:{" "}
                <span className="code-token-string">
                  &quot;Scalable APIs &amp; Clean Architecture&quot;
                </span>
                ,
              </p>
              <p className="pl-4">
                currentlyLearning: [
                <span className="code-token-string">
                  &quot;System Design&quot;
                </span>
                ,{" "}
                <span className="code-token-string">
                  &quot;Microservices&quot;
                </span>
                ],
              </p>
              <p className="pl-4">
                availability:{" "}
                <span className="code-token-string">
                  &quot;Open to opportunities&quot;
                </span>
              </p>
              <p>{"};"}</p>
              <p className="mt-4 code-token-comment">
                // status: actively building, always shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecorativeTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* top-right swatch */}
      <svg className="absolute -top-8 -right-8 h-24 w-24 md:h-28 md:w-28">
        <defs>
          <pattern
            id="hero-dots-tr"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="var(--outline-variant)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots-tr)" />
      </svg>

      {/* left-center swatch */}
      <svg className="absolute -left-12 top-1/2 -translate-y-1/2 h-24 w-24 md:h-28 md:w-28">
        <defs>
          <pattern
            id="hero-dots-lc"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="var(--outline-variant)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots-lc)" />
      </svg>
    </div>
  );
}
