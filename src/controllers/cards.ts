import type { RequestHandler } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import type { Card } from "../types/card.js";

const cardPath = path.join(import.meta.dirname, "../../data/cards.json");

const readCards = async (): Promise<Card[]> => {
  const cardsFile = await fs.readFile(cardPath, "utf8");
  return JSON.parse(cardsFile);
};

const getCards: RequestHandler = async (_req, res) => {
  try {
    const cards = await readCards();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error has ocurred on the server" });
  }
};

export { getCards };
