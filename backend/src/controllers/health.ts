import { Request, Response } from 'express';

/**
 * GET /health
 * Healthcheck
 */
export const index = (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toString(),
    version: 1,
  });
};
