const app = require('express')();
const cors = require ('cors');
app.use(cors());

app.get('/user', (req, res) => res.send('Hello User API'));

app.listen(3001, () => console.log(`User API listening on port 3001!`));