const app = require('express')();

app.get('/guest', (req, res) => res.send('Hello Guest API'));

app.listen(3002, () => console.log(`Guest API listening on port 3002!`));