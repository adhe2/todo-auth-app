import Todos from "../models/todos.js";
import Users from "../models/users.js";
import { Op } from "sequelize";

export const getTodos = async (req, res) => {
  try {
    if (req.role === "admin") {
      const todos = await Todos.findAll({
        attributes: ["uuid", "title", "description", "status"],
        include: {
          model: Users,
          attributes: ["name", "email", "role"],
        },
      });

      res.status(200).json(todos);
    } else {
      const todosUser = await Todos.findAll({
        attributes: ["uuid", "title", "description", "status"],
        where: {
          userId: req.userId,
        },
      });
      res.status(200).json(todosUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};

export const getTodosById = async (req, res) => {
  try {
    if (req.role === "admin") {
      const todo = await Todos.findOne({
        where: {
          uuid: req.params.id,
        },
        attributes: ["uuid", "title", "description", "status"],
        include: {
          model: Users,
          attributes: ["name", "email", "role"],
        },
      });

      res.status(200).json(todo);
    } else {
      const todoUser = await Todos.findOne({
        where: {
          [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }],
        },
        attributes: ["uuid", "title", "description", "status"],
      });

      res.status(200).json(todoUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};

export const createTodos = async (req, res) => {
  try {
    const { title, description } = req.body;

    const create = await Todos.create({
      title: title,
      description: description,
      status: "pending",
      userId: req.userId,
    });

    res.status(201).json({
      msg: "Tugas telah berhasil dibuat:",
      data: create,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};

export const updateTodos = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    let todo;

    if (req.role === "admin") {
      todo = await Todos.findOne({
        where: {
          uuid: req.params.id,
        },
      });
    } else {
      todo = await Todos.findOne({
        where: {
          [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }],
        },
      });
    }

    if (!todo) return res.status(404).json({ msg: "Tugas tidak ditemukan!" });

    const update = await Todos.update(
      { title, description, status },
      {
        where: {
          id: todo.id,
        },
      },
    );

    res.status(200).json({ msg: "Tugas berhasil diperbaharui!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};

export const deleteTodos = async (req, res) => {
  try {
    if (req.role === "admin") {
      const todo = await Todos.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      if (!todo) return res.status(404).json({ msg: "Tugas tidak ditemukan." });

      res.status(200).json({ msg: "Tugas berhasil dihapus." });
    } else {
      const todo = await Todos.destroy({
        where: {
          [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }],
        },
      });

      if (!todo) return res.status(404).json({ msg: "Tugas tidak ditemukan." });

      res.status(200).json({ msg: "Tugas berhasil dihapus." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};
