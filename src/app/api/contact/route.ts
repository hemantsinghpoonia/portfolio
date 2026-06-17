// import { NextResponse } from "next/server";

// async function saveMessageToDb(data: {
//   name: string;
//   email: string;
//   message: string;
// }) {
//   // Example with Prisma:
//   // await prisma.contactMessage.create({ data });
//   console.log("Saving message to DB:", data);
// }

// async function notifyViaBrevo(data: {
//   name: string;
//   email: string;
//   message: string;
// }) {
//   const res = await fetch("https://api.brevo.com/v3/smtp/email", {
//     method: "POST",
//     headers: {
//       "api-key": process.env.BREVO_API_KEY ?? "",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       sender: { email: "noreply@hemantsingh.dev", name: "Portfolio" },
//       to: [{ email: "hello@hemantsingh.dev" }],
//       replyTo: { email: data.email, name: data.name },
//       subject: `New portfolio message from ${data.name}`,
//       htmlContent: `<p><strong>From:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`,
//     }),
//   });

//   if (!res.ok) {
//     throw new Error(`Brevo request failed: ${res.status}`);
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     // 1. Persist first — this is the source of truth.
//     // If Brevo fails below, the message is not lost.
//     await saveMessageToDb({ name, email, message });

//     // 2. Notify via email — best-effort, failure here doesn't fail the request.
//     try {
//       await notifyViaBrevo({ name, email, message });
//     } catch (err) {
//       console.error("Brevo notification failed (message still saved):", err);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error("Contact form error:", err);
//     return NextResponse.json(
//       { error: "Failed to process message" },
//       { status: 500 },
//     );
//   }
// }
