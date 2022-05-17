const app = require('express')();
const cors = require ('cors');
app.use(cors());

app.get('/guest', (req, res) => res.send('Hello Guest API'));

app.listen(3002, () => console.log(`Guest API listening on port 3002!`));