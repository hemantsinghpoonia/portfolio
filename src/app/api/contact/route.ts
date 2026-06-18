import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import brevo from "@/lib/brevo";
import { contactRateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/contact";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

async function notifyViaBrevo(data: ContactPayload) {
  const res = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      email: "noreply@hemantsingh.dev",
      name: "Portfolio",
    },
    to: [{ email: "hello@hemantsingh.dev" }],
    replyTo: { email: data.email, name: data.name },
    subject: `New portfolio message from ${data.name}`,
    htmlContent: `<p><strong>From:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`,
  });

  if (!res.messageId) {
    throw new Error(`Brevo request failed`);
  }
}

export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success, limit, remaining, reset } = await contactRateLimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // honeypot: silently accept without doing any real work
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // If Brevo fails below, the message is not lost.
  let saved;
  try {
    saved = await prisma.contactMessage.create({
      data: { name, email, message },
    });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }

  try {
    await notifyViaBrevo({ name, email, message });
    await prisma.contactMessage.update({
      where: { id: saved.id },
      data: { status: "NOTIFIED" },
    });
  } catch (err) {
    console.error("Brevo notification failed (message still saved):", err);
    await prisma.contactMessage.update({
      where: { id: saved.id },
      data: { status: "FAILED" },
    });
  }

  return NextResponse.json({ ok: true });
}
