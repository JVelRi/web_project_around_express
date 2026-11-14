import type { RequestHandler } from "express";

export const handleNotFound: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
};
