import type { Request, Response, NextFunction } from 'express';

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.warn(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
