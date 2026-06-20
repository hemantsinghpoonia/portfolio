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
            I&apos;m a full-stack software engineer focused on building SaaS
            products, with hands-on experience across modern web development,
            system architecture, authentication, data modeling, and AI-assisted
            workflows. I do my best work on real applications, where frontend,
            backend, database, and automation all have to fit together cleanly.
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
                B.Tech in Computer Science Engineering (AI & ML)
              </p>
              <p className="text-sm text-muted-foreground">
                Meerut Institute of Engineering and Technology, 2022–2026,
                graduating with a 7.85 CGPA — with a focus on modern web
                architecture throughout.
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
