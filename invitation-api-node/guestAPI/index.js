require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = require("express")();
const knex = require("knex")({
  client: "pg",
  debug: true,
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get("/guest/user/:id", (req, res, next) => {
  let id = parseInt(req.params.id);

  knex
    .select("*")
    .from("guest")
    .where("id_user", "=", id)
    .then((guest) =>
      guest.length
        ? res.status(200).json(guest)
        : res.status(204).json({
            mensagemUsuario: "Nenhum convidado cadastrado! ",
          })
    )
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao recuperar guest - " + err.message,
      });
    });
});

app.get("/guest/:id", (req, res) => {
  let id = parseInt(req.params.id);
  knex
    .select("*")
    .from("guest")
    .where("id", "=", id)
    .then((guest) => res.status(200).json(guest))
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao recuperar guest - " + err.message,
      });
    });
});

app.post("/guest", (req, res, next) => {
  knex("guest")
    .insert(
      {
        confirmation: req.body.confirmation,
        guest: req.body.guest,
        host: req.body.host,
        qrcode: req.body.qrcode,
        id_user: req.body.user.id,
      },
      ["id"]
    )
    .then((resultado) => {
      let guestNew = resultado[0];
      res.status(201).json({ id: guestNew.id });
    })
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao inserir convidado! - " + err.message,
      });
    });
});

app.put("/guest/:id", (req, res, next) => {
  let id = parseInt(req.params.id);

  knex("guest")
    .where("id", "=", id)
    .update(
      {
        confirmation: req.body.confirmation,
        guest: req.body.guest,
        host: req.body.host,
        qrcode: req.body.qrcode,
        id_user: req.body.user.id,
      },
      ["id"]
    )
    .then((resultado) => {
      let guestUpdate = resultado[0];
      res.status(200).json({ id: guestUpdate.id });
    })
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao alterar convidado! - " + err.message,
      });
    });
});

app.delete("/guest/:id", (req, res, next) => {
  let id = parseInt(req.params.id);

  knex("guest")
    .where("id", id)
    .del()
    .then(() =>
      res
        .status(200)
        .json({ mensagemUsuario: "Convidado deletado com sucesso!" })
    )
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao deletar produto! - " + err.message,
      });
    });
});

//app.listen(3002, () => console.log(`Guest API listening on port 3002!`));