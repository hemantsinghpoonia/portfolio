import { Mail, MapPin } from "lucide-react";
import {
  GitHubIcon as Github,
  LinkedInIcon as Linkedin,
  XIcon as Twitter,
} from "./icons";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Contact() {
  return (
    <section id="contact" className="mb-16">
      <div className="section-heading">
        <h3 className="font-heading text-headline-md text-foreground">
          Let&apos;s Work Together
        </h3>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-surface-container-low border-none">
        <div>
          <h4 className="font-heading text-foreground font-semibold mb-6 text-2xl">
            Have a project in mind?
          </h4>
          <p className="text-body-lg text-muted-foreground mb-8">
            I&apos;m currently available for full-time opportunities and
            interesting freelance projects. Let&apos;s discuss how I can help
            bring your ideas to life with robust architecture and clean code.
          </p>
          <div className="space-y-4 mb-8">
            <a
              href="mailto:hello@hemantsingh.dev"
              className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
              <span className="text-body-md">hello@hemantsingh.dev</span>
            </a>
            <div className="flex items-center gap-4 text-muted-foreground">
              <MapPin size={20} />
              <span className="text-body-md">Meerut, India</span>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex gap-4">
            <Button
              asChild
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://linkedin.com/in/hemantsinghpoonia"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://github.com/hemantsinghpoonia"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <a href="https://x.com/hemantspoonia" aria-label="X (Twitter)">
                <Twitter size={18} />
              </a>
            </Button>
          </div>
        </div>

        <ContactForm />
      </Card>
    </section>
  );
}
