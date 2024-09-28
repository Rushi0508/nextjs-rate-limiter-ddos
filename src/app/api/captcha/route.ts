import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@/lib/rateLimiter";

const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY!;

const handler = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", body.token);
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });
  const challengeSucceeded = (await result.json()).success;

  if (!challengeSucceeded) {
    return NextResponse.json({
      message: "Invalid reCAPTCHA token",
      status: 400,
    });
  }

  return NextResponse.json({ msg: "Request Successful", status: 200 });
};

export const POST = withRateLimit(handler, 5, 60);
