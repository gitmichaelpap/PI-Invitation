require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const httpProxy = require('express-http-proxy');
const userServiceProxy = httpProxy(process.env.USER_API_URL);
const userRouter = express.Router();

userRouter.use(cors());

userRouter.get('/user/teste', (req, res) => res.send('Oii userRouter!!'));

userRouter.post('/user/login', (req, res, next) => userServiceProxy(req, res, next));
userRouter.post('/user/register', (req, res, next) => userServiceProxy(req, res, next));

module.exports = userRouter;