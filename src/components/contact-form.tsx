"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactField } from "@/components/contact-field";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.company) {
      // honeypot tripped — pretend success, don't hit the API
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <ContactField
            name="company"
            control={control}
            label="Company"
            type="text"
          />
        </div>

        <ContactField
          name="name"
          control={control}
          label="Name"
          placeholder="John Doe"
        />

        <ContactField
          name="email"
          control={control}
          label="Email"
          placeholder="john@example.com"
          type="email"
        />

        <ContactField
          name="message"
          control={control}
          label="Message"
          placeholder="Tell me about your project..."
          as="textarea"
          rows={4}
        />

        <Button
          className="w-full py-4 h-auto uppercase tracking-wider flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
          <Send size={18} />
        </Button>

        {status === "success" && (
          <p className="text-sm text-brand-strong" role="status">
            Thanks — your message has been sent. I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            Something went wrong. Please email me directly at
            hello@hemantsingh.dev.
          </p>
        )}
      </form>
    </div>
  );
}
