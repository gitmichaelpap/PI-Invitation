require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const app = require('express')();
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

app.get('/guest/user/:id', (req, res, next) => {
    let id = parseInt(req.params.id);

    knex
    .select('*')
    .from('produto')
    .where('id', id)
    .then( guest => 
        guest.length
        ? res.status(200).json(guest)
        : res.status(404).json({ 
            message: 'Produto não encontrado'
        })
    )
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao recuperar guest - ' + err.message })
    })
});

app.get('/guest/:id', (req, res) => {
    knex
    .select('*')
    .from('produto')
    .then( guest => res.status(200).json(guest) )
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao recuperar guest - ' + err.message })
    })
})

app.post('/guest', (req, res, next) => {

        knex('produto')
        .insert({
                descricao: req.body.descricao,
                marca: req.body.marca,
                valor: req.body.valor
            }, ['id'])
        .then( resultado => {
            let produto = resultado[0];
            res.status(201).json({
                id: produto.id,
                descricao: req.body.descricao,
                marca: req.body.marca,
                valor: req.body.valor
            })
        })
        .catch(err => {
            res.status(500).json({
            message: 'Erro ao inserir produto! - ' + err.message })
        })
});

app.put('/guest/:id', (req, res, next) => {
    let id = parseInt(req.params.id);

    knex('produto')
    .where('id', '=', id)
    .update({
            id: id,
            descricao: req?.body?.descricao,
            marca: req?.body?.marca,
            valor: req?.body?.valor
        }, ['id', 'descricao', 'marca', 'valor'])
    .then( resultado => {
        let produto = resultado[0];
        res.status(204).json({
            id: produto.id,
            descricao: produto.descricao,
            marca: produto.marca,
            valor: produto.valor
        })
    })
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao alterar produto! - ' + err.message })
    })
});

app.delete('/guest/:id', (req, res, next) => {
    let id = parseInt(req.params.id);

    knex('produto')
    .where('id', id)
    .del()
    .then( () => 
        res.status(200).json({message: 'Produto deletado com sucesso!'})
    )
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao deletar produto! - ' + err.message })
    })
});


app.listen(3002, () => console.log(`Guest API listening on port 3002!`));