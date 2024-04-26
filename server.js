const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./database/database')
const port = 3000;
const host='localhost'
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello");
});

mongoDB.initDb((err)=> {
    if(err) {
        console.log(err);
    }
    else {

        app.listen(port, () => {
            console.log(`Database and app listening on ${host}:${port}`)
          })
    }
})

