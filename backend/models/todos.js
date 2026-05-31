import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Users from "./users.js";

const { DataTypes } = Sequelize;

const Todos = db.define(
  "todos",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { freezeTableName: true },
);

Users.hasMany(Todos, { foreignKey: "userId", onDelete: "CASCADE" });
Todos.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

export default Todos;
