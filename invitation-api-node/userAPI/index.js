const app = require('express')();

app.get('/user', (req, res) => res.send('Hello User API'));

app.listen(3001, () => console.log(`User API listening on port 3001!`));