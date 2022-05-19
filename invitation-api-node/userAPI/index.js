require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const app = require('express')();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post ('/user/register', express.json(), (req, res) => {
    knex ('user')
    .insert({
        fiancee: req.body.fiancee,
        fiance: req.body.fiance,
        weddingDay: req.body.weddingDay,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        dtRegister: req.body.dtRegister
    }, ['id'])
    .then((result) => {
        let user = result[0]
        res.status(200).json({"id": user.id })
        return
    })
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao registrar usuario - ' + err.message })
    })
})

app.post('/user/login', express.json(), (req, res) => {
    knex
    .select('*').from('user').where( { email: req.body.email })
    .then( users => {
    if(users.length){
        let user = users[0]
        let checkPassword = bcrypt.compareSync (req.body.password, user.password)
        if (checkPassword) {
            var tokenJWT = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {expiresIn: 3600, algorithm: 'HS256'})
            res.status(200).json ({
                id: user.id,
                email: user.email,
                fiance: user.fiance,
                token: tokenJWT
            })
            return
        }
    }
        res.status(200).json({ message: 'Login ou senha incorretos' })
    })
    .catch (err => {
        res.status(500).json({
        message: 'Erro ao verificar login - ' + err.message })
    })
})

app.listen(3001, () => console.log(`User API listening on port 3001!`));