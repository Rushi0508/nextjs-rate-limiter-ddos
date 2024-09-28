import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";

export const createRateLimiter = (points: number, duration: number) => {
  return new RateLimiterMemory({
    points,
    duration,
  });
};

export const applyRateLimiter = async (
  rateLimiter: RateLimiterMemory,
  req: NextRequest
) => {
  try {
    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for") ||
      req.ip ||
      "";
    await rateLimiter.consume(ip);
  } catch {
    throw NextResponse.json({
      status: 429,
      msg: "Too Many Requests",
    });
  }
};

export const withRateLimit = (
  handler: (req: NextRequest, res: NextResponse) => Promise<NextResponse>,
  points: number,
  duration: number
) => {
  const rateLimiter = createRateLimiter(points, duration);
  return async (req: NextRequest, res: NextResponse) => {
    try {
      await applyRateLimiter(rateLimiter, req);
      return handler(req, res);
    } catch {
      return NextResponse.json({
        status: 429,
        msg: "Too Many Requests",
      });
    }
  };
};
