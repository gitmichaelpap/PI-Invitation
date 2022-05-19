require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = require("express")();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

app.post("/user/register", (req, res) => {
  knex("usuario")
    .insert(
      {
        nome: req.body.nome,
        login: req.body.login,
        senha: bcrypt.hashSync(req.body.senha, 8),
        email: req.body.email,
      },
      ["id"]
    )
    .then((result) => {
      let usuario = result[0];
      res.status(200).json({ id: usuario.id });
      return;
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao registrar usuario - " + err.message,
      });
    });
});

app.post("/user/login", (req, res) => {
  knex
    .select("*")
    .from("usuario")
    .where({ login: req.body.login })
    .then((usuarios) => {
      if (usuarios.length) {
        let usuario = usuarios[0];
        let checkSenha = bcrypt.compareSync(req.body.senha, usuario.senha);
        if (checkSenha) {
          var tokenJWT = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: 3600,
            algorithm: "HS256",
          });
          res.status(200).json({
            id: usuario.id,
            login: usuario.login,
            nome: usuario.nome,
            roles: usuario.roles,
            token: tokenJWT,
          });
          return;
        }
      }
      res.status(200).json({ message: "Login ou senha incorretos" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao verificar login - " + err.message,
      });
    });
});

app.listen(3001, () => console.log(`User API listening on port 3001!`));
