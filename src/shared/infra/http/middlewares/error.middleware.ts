import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const { message, statusCode } = error;

    return response.status(statusCode).json({ message });
  }

  return response
    .status(500)
    .json({ message: `Internal server error - ${error.message}` });
};

export { errorMiddleware };
