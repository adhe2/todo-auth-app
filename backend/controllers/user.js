import { Sequelize, where } from "sequelize";
import Users from "../models/users.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dengan confPassword tidak cocok." });

    const hashPassword = await argon2.hash(password);

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        msg: "Email sudah digunakan",
      });
    }

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "user",
    });
    res.status(201).json({ msg: "User berhasil dibuat" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." });

    const { name, email, password, confPassword } = req.body;
    let hashPassword;

    if (password === "" || password === null) {
      hashPassword = user.password;
    } else {
      if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok dengan confPassword." });

      hashPassword = await argon2.hash(password);
    }

    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          uuid: req.params.id,
        },
      },
    );

    res.status(200).json({ msg: "User berhasil di update." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const response = await Users.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "User berhasil dihapus." });
  } catch (error) {
    console.log(error);
  }
};
