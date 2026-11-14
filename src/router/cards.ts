import { Router } from "express";
import { getCards } from "../controller/cards.js";

const cardsRouter = Router();

cardsRouter.get("/", getCards);

export { cardsRouter };
