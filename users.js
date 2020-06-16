const express = require("express");
const User = require("../models/users");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();

// GET
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).send({ users });
  } catch (err) {
    return res
      .status(400)
      .send({ Error: "Erro ao carregar a lista de Usuarios" });
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar o Usuario" });
  }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      endereco: req.body.endereco,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
    });

    await user.save();
    return res.status(201).send({ message: "Usuario criado", user });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar um novo Usuario" });
  }
});

// PUT
router.put("/:userId", cors(), async (req, res, next) => {
  try {
    const user = req.params.userId;
    await User.findByIdAndUpdate(user, req.body, { new: true });

    return res
      .status(200)
      .send({ message: "Usuario atualizado", usuario: user });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao atualizar o Usuario" });
  }
});

// DELETE
router.delete("/:userId", cors(), async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);

    return res.status(200).send({ message: "Usuario deletado", user });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar o Usuario" });
  }
});

module.exports = router;
