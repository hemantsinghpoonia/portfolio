import { GraduationCap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="mb-32">
      <div className="section-heading">
        <h3 className="font-heading text-headline-md text-foreground">
          About Me
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-layout-bento-gap">
        <Card className="md:col-span-7">
          <p className="text-body-lg text-muted-foreground mb-6">
            I&apos;m a developer driven by the intersection of technical
            precision and meaningful user experiences. As a recent B.Tech
            graduate, I specialize in building robust, scalable systems that
            solve real-world problems. I don&apos;t just write code; I architect
            solutions that are reliable, performant, and delightful to use.
          </p>
        </Card>

        <div className="md:col-span-5 grid grid-cols-1 gap-layout-bento-gap">
          <Card className="flex flex-row items-start gap-4">
            <GraduationCap className="text-brand-strong shrink-0" size={28} />
            <div>
              <h4 className="text-label-sm text-muted-foreground uppercase tracking-wider mb-1">
                Education
              </h4>
              <p className="font-heading text-foreground font-semibold mb-2 text-lg">
                B.Tech in Computer Science
              </p>
              <p className="text-sm text-muted-foreground">
                Recently graduated from Meerut, India with a focus on modern web
                architecture.
              </p>
            </div>
          </Card>

          <Card className="flex flex-row items-start gap-4">
            <Rocket className="text-brand-strong shrink-0" size={28} />
            <div>
              <h4 className="text-label-sm text-muted-foreground uppercase tracking-wider mb-1">
                Philosophy
              </h4>
              <p className="font-heading text-foreground font-semibold mb-2 text-lg">
                Engineering Excellence
              </p>
              <p className="text-sm text-muted-foreground">
                Software enthusiast focused on delivering high-quality,
                impactful products. I prioritize clean code, scalability, and
                seamless user journeys.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
