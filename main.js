const express = require('express');
const landingsRoute = require("./routers/landings")
require("dotenv").config();


//leemos .env
const HTTP = {
    port: process.env.HTTP_PORT||8080,
    host: process.env.HTTP_HOST||"127.0.0.1"
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/astronomy/landigns', landingsRoute);


app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.listen(HTTP.port, HTTP.host, () => {
  console.log(`Example app listening at http://${HTTP.host}:${HTTP.port}`)
})
