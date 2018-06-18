const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db.js');

const app = express();

const port = 8050;

app.use(bodyParser.urlencoded({extended: true}));
// Express can't process URL encoded forms on it's own,
// thus we use the body-parser package

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log(`We're live on ${port}`);
    });
})

