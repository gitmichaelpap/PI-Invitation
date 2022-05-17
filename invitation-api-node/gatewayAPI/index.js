require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const morgan = require('morgan');
const httpProxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello Gateway API'));
// const userRouter = require ('./routers/userRouter')
// const guestRouter = require ('./routers/guestRouter')

app.use(cors());
const jwt = require('jsonwebtoken');
const userServiceProxy = httpProxy(process.env.USER_API_URL);
const guestServiceProxy = httpProxy(process.env.GUEST_API_URL);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('common'));


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
app.post('/user/login', (req, res, next) => userServiceProxy(req, res, next));
app.post('/user/register', (req, res, next) => userServiceProxy(req, res, next));

app.get('/guest/user/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
app.get('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
app.post('/guest', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
app.put('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));
app.delete('/guest/:id', checkToken,(req, res, next) => guestServiceProxy(req, res, next));


// app.use('/user', userRouter);
// app.use('/guest', guestRouter);

app.use((req, res, ) => {res.status(404).send('Caminho inválido')});

app.listen(port, () => console.log(`Servidor rodando em htttp://localhost:${port}!`));