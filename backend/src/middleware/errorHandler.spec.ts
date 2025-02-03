import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import errorHandler, { ResponseError } from "./errorHandler";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      body: {},
      url: "/test-url",
      originalUrl: "/test-url",
      method: "GET",
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should handle generic errors", () => {
    const error = new ResponseError(
      500,
      "Internal Server Error",
      new Error("Something went wrong")
    );

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Internal Server Error",
    });
  });

  it("should handle Zod validation errors", () => {
    const zodError = z
      .object({
        field: z.string(),
      })
      .safeParse({ field: 1 });

    const error = new ResponseError(
      422,
      "Validation Error",
      new z.ZodError(zodError.error?.issues!)
    );

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      status: 422,
      message: "Validation Error",
    });
  });

  it("should remove authorization header from logs", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    req.headers!.authorization = "Bearer token";
    const error = new ResponseError(
      500,
      "Internal Server Error",
      new Error("Something went wrong")
    );

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Internal Server Error",
    });
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          req: expect.objectContaining({
            headers: expect.not.objectContaining({
              authorization: expect.any(String),
            }),
          }),
        }),
      }),
      "Internal Server Error"
    );
  });
});
