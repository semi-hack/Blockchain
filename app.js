const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const db = require('./config/db');

const app = express();

app.use(route);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(4040, console.log(" app running"))
module.exports = { app }