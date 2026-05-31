import { verify } from "argon2";
import { createUser, getUser, getUserById, deleteUser, updateUser } from "../controllers/user.js";
import { VerifyUser, adminOnly } from "../middleware/AuthVerify.js";
import express from "express";

const routerUser = express.Router();

routerUser.get("/users", VerifyUser, adminOnly, getUser);
routerUser.get("/users/:id", VerifyUser, adminOnly, getUserById);
routerUser.post("/users", createUser);
routerUser.patch("/users/:id", VerifyUser, adminOnly, updateUser);
routerUser.delete("/users/:id", VerifyUser, adminOnly, deleteUser);

export default routerUser;
