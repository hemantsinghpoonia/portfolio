import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Backend",
    skills: ["Fastify", "Express", "Node.js", "RAG", "RBAC"],
  },
  {
    title: "Database & Auth",
    skills: [
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Mongoose",
      "Better-Auth",
      "Redis",
    ],
  },
  { title: "Tools", skills: ["Turborepo", "Git", "Docker"] },
];

export function Skills() {
  return (
    <section id="skills" className="mb-32">
      <div className="section-heading">
        <h3 className="font-heading text-headline-md text-foreground">
          Technical Arsenal
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-layout-bento-gap">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <h4 className="text-label-sm text-brand-strong uppercase tracking-wider mb-6 border-b border-outline-variant pb-2">
              {group.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="chip">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
