import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(5, "Message should be at least 5 characters")
    .max(5000, "Message is too long"),
  company: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type ContactFormValues = z.infer<typeof contactSchema>;
