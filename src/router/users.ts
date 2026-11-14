import { Router } from "express";
import { getUsers, getUserById } from "../controller/users.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:_id", getUserById);

export { usersRouter };
