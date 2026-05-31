import express from "express";
import { login, Me, logOutUser } from "../controllers/Auth.js";

const routerAuth = express.Router();

routerAuth.post("/login", login);
routerAuth.get("/me", Me);
routerAuth.delete("/logout", logOutUser);

export default routerAuth;
