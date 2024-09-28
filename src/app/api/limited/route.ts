import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@/lib/rateLimiter";

const handler = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ msg: "Request Successful", status: 200 });
};

export const GET = withRateLimit(handler, 5, 60);
