const express = require('express');
const landingsRoute = require("./routers/landings")
const neasRoute = require("./routers/neas")
const db = require("./database/mongoose");

require("dotenv").config();


//leemos .env
const HTTP = {
    port: process.env.HTTP_PORT||8080,
    host: process.env.HTTP_HOST||"127.0.0.1"
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/astronomy/landigns', landingsRoute);
app.use('/astronomy/neas', neasRoute);

app.listen(HTTP.port, HTTP.host, () => {
  console.log(`astronomy app listening at http://${HTTP.host}:${HTTP.port}`)
})
