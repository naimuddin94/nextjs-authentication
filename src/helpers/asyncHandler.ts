import { NextRequest, NextResponse } from "next/server";

type RequestHandler = (
  req: NextRequest,
  res: NextResponse,
  next: (error?: any) => void
) => Promise<void>;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: NextRequest, res: NextResponse, next: (error?: any) => void) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
