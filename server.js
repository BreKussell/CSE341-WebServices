const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./database/database.js')
const port = 3001;
const host='localhost'
const app = express();

app.use(bodyParser.json());

//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello");
});


app.use('/', require('./routes'))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


//Database
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

