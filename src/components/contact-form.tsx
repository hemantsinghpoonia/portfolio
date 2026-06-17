"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="field-label" htmlFor="name">
            Name
          </label>
          <Input id="name" name="name" placeholder="John Doe" type="text" required />
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="message">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            rows={4}
            required
          />
        </div>

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
            Thanks — your message has been sent. I&apos;ll get back to you
            soon.
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
