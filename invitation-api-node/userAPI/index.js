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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.post("/user/register", (req, res) => {
  knex("user")
    .insert(
      {
        data_register: req.body.dtRegister,
        email: req.body.email,
        fiance: req.body.fiance,
        fiancee: req.body.fiancee,
        password: bcrypt.hashSync(req.body.password, 8),
        wedding_day: req.body.weddingDay,
      },
      ["id"]
    )
    .then((result) => {
      let usuario = result[0];
      res.status(201).json({ id: usuario.id });
      return;
    })
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao registrar usuario - " + err.message,
      });
    });
});

app.post("/user/login", (req, res) => {
  knex
    .select("*")
    .from("user")
    .where({ email: req.body.email })
    .then((user) => {
      if (user.length) {
        let usuario = user[0];
        let checkSenha = bcrypt.compareSync(
          req.body.password,
          usuario.password
        );
        if (checkSenha) {
          var tokenJWT = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: 3600,
            algorithm: "HS256",
          });
          res.status(200).json({
            user: {
              id: usuario.id,
              fiancee: usuario.fiancee,
              fiance: usuario.fiance,
              weddingDay: usuario.wedding_day,
              dtRegister: usuario.data_register,
            },
            acessToken: tokenJWT,
          });
          return;
        }
      }
      res.status(200).json({ mensagemUsuario: "Login ou senha incorretos" });
    })
    .catch((err) => {
      res.status(500).json({
        mensagemUsuario: "Erro ao verificar login - " + err.message,
      });
    });
});
