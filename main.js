const express = require('express');
require("dotenv").config();


//leemos .env
const HTTP = {
    port: process.env.HTTP_PORT||8080,
    host: process.env.HTTP_HOST||"127.0.0.1"
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(HTTP.port, HTTP.host, () => {
  console.log(`Example app listening at http://${HTTP.host}:${HTTP.port}`)
})
