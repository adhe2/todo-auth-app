import express from "express";
import cors from "cors";
import db from "./config/database.js";
import dotenv from "dotenv";
import Users from "./models/users.js";
import Todos from "./models/todos.js";
import routerUser from "./routes/userRoute.js";
import routerAuth from "./routes/AuthLogin.js";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import routerTodos from "../backend/routes/todosRoute.js";

dotenv.config();

const app = express();

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: db,
});

// const init = async () => {
//   await db.sync();
// };
// init();

// const initStore = async () => {
//   await sessionStore.sync();
// };
// initStore();

// await db.sync({ alter: true });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  }),
);

app.use(routerUser);
app.use(routerAuth);
app.use(routerTodos);

app.listen(process.env.APP_PORT, () => {
  try {
    console.log("Server up and running");
  } catch (error) {
    console.log(error);
  }
});
