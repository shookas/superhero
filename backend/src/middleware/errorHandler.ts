import { NextFunction, Request, Response } from 'express';

export class ResponseError {
  status: number;
  message: string;
  error: Error;
  constructor(status: number, message: string, error: Error) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}


/* eslint-disable @typescript-eslint/no-unused-vars */
export default (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const logBody = {
    status,
    error: err.error
      ? {
          stack: err.error.stack,
          name: err.error.name,
          message: err.error.message,
        }
      : {},
    req: req
      ? {
          headers: req.headers,
          body: req.body,
          url: req.url.toString(),
          originalUrl: req.originalUrl,
          method: req.method,
        }
      : {},
  };
  const resBody = {
    status,
    message: err.message,
  };

  if (logBody.req.headers?.authorization) {
    delete logBody.req.headers.authorization;
  }

  console.error({ body: logBody }, err.message);

  res.status(status);
  res.json(resBody);
};
