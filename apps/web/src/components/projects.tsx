import { Construction } from "lucide-react";
import { ProjectCard, type Project } from "./project-card";
import { Card } from "@/components/ui/card";

const projects: Project[] = [
  {
    name: "Respondo",
    tagline: "AI-Driven Helpdesk Platform",
    problem:
      "Customer support teams struggling with fragmented data and slow response times.",
    action:
      "Built an AI-driven helpdesk using Next.js, Fastify, and Turborepo. Implemented RAG for smart data retrieval and RBAC via Better-Auth.",
    tags: ["Next.js", "Fastify", "Turborepo", "RAG"],
    caseStudyUrl: "#",
    images: [
      {
        src: "/projects/respondo-dashboard.png",
        alt: "Respondo dashboard view",
        label: "Dashboard",
      },
      {
        src: "/projects/respondo-chat.png",
        alt: "Respondo RAG chat interface",
        label: "Chat",
      },
      {
        src: "/projects/respondo-admin.png",
        alt: "Respondo admin panel",
        label: "Admin",
      },
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="mb-32">
      <div className="section-heading">
        <h3 className="font-heading text-headline-md text-foreground">
          Featured Work
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}

        <Card className="border-dashed border-2 border-outline-variant flex flex-col items-center justify-center py-24 text-center">
          <Construction className="text-muted-foreground mb-4" size={36} />
          <h4 className="font-heading text-headline-md text-foreground mb-2">
            Next Big Thing
          </h4>
          <p className="text-body-md text-muted-foreground max-w-md">
            Currently architecting a scalable microservices solution. Details
            coming soon.
          </p>
        </Card>
      </div>
    </section>
  );
}
