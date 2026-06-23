import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type: string; slug?: string };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag("blog-content", "max");
    if (body.slug) revalidateTag(`blog-post:${body.slug}`, "max");

    return NextResponse.json({ revalidated: true, body });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
