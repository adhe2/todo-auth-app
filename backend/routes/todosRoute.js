import { getTodos, getTodosById, createTodos, updateTodos, deleteTodos } from "../controllers/todos.js";
import { VerifyUser } from "../middleware/AuthVerify.js";
import express from "express";

const routerTodos = express.Router();

routerTodos.get("/todos", VerifyUser, getTodos);
routerTodos.get("/todos/:id", VerifyUser, getTodosById);
routerTodos.post("/todos", VerifyUser, createTodos);
routerTodos.patch("/todos/:id", VerifyUser, updateTodos);
routerTodos.delete("/todos/:id", VerifyUser, deleteTodos);

export default routerTodos;
