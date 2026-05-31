import { Sequelize } from "sequelize";

const db = new Sequelize("todo_auth_db", "backend", "Mysql@2889", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
