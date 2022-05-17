require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const httpProxy = require('express-http-proxy');
const guestServiceProxy = httpProxy(process.env.GUEST_API_URL);
const guestRouter = express.Router();
const jwt = require('jsonwebtoken');

guestRouter.use(cors());

//------- Auth
let checkToken = (req, res, next) => {
    let authToken = req.headers["authorization"];
    if (!authToken) {
        res.status(401).json({ message: 'Token de acesso requerida' });
    }
    else {
        let token = authToken.split(' ')[1];
        req.token = token;
    }
    jwt.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => {
        if (err) {
            res.status(401).json({ message: 'Acesso negado'});
            return
        }
        req.usuarioId = decodeToken.id;
        next();
    });
};
//------- Rotes

guestRouter.get('/guest/user/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
guestRouter.get('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
guestRouter.post('/guest', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
guestRouter.put('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
guestRouter.delete('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));

module.exports = guestRouter;