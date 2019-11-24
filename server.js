const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("In server.js");
app.use('/', require('./routes/api-routes'));

const port = process.env.port || 8080;
app.listen(port,() => console.log(`Listening to port ${port}`));