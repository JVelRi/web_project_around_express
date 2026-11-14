import { Router } from "express";
import { usersRouter } from "./users.js";
import { cardsRouter } from "./cards.js";
import { handleNotFound } from "../controller/notfound.js";
const router = Router();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use("/", handleNotFound);

export default router;
