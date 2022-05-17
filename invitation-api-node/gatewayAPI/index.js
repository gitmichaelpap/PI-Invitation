const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3000;
const {
  USER_API_URL,
  GUEST_API_URL,
} = require('./URLs');

const USERerviceProxy = httpProxy(USER_API_URL);
const guestServiceProxy = httpProxy(GUEST_API_URL);

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => res.send('Hello Gateway API'));

app.get('/user', (req, res, next) => USERerviceProxy(req, res, next));

app.get('/guest', (req, res, next) => guestServiceProxy(req, res, next));

app.use((req, res, ) => {res.status(404).send('Caminho inválido')});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));