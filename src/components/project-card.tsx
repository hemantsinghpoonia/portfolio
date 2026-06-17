import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectImageShowcase } from "./project-showcase";

export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
};

export type Project = {
  name: string;
  tagline: string;
  problem: string;
  action: string;
  result?: string;
  tags: string[];
  caseStudyUrl?: string;
  images: ProjectImage[];
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-6">
          <h4 className="font-heading text-headline-md text-foreground">
            {project.name}
          </h4>
          <p className="text-label-sm text-brand-strong uppercase tracking-wider">
            {project.tagline}
          </p>
          <div className="space-y-4 text-body-md text-muted-foreground">
            <div>
              <strong className="text-foreground block mb-1">Problem:</strong>
              {project.problem}
            </div>
            <div>
              <strong className="text-foreground block mb-1">Action:</strong>
              {project.action}
            </div>
            {project.result && (
              <div>
                <strong className="text-foreground block mb-1">Result:</strong>
                {project.result}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="strong">
                {tag}
              </Badge>
            ))}
          </div>

          {project.caseStudyUrl && (
            <div className="pt-6">
              <Button
                asChild
                variant="ghost"
                className="px-0 h-auto uppercase tracking-wider"
              >
                <a href={project.caseStudyUrl}>
                  View Case Study{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </Button>
            </div>
          )}
        </div>

        <ProjectImageShowcase images={project.images} />
      </div>
    </Card>
  );
}
