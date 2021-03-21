// Aquí configuración de conexión a la base de datos
const mongoose = require('mongoose');
require("dotenv").config();


const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/astronomy`;

//conectamos a la base de datos una sola vez y esa misma conexión se reutilizará
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info('Connected to DB!', DB_URI);
  })
  .catch((err) => console.error(err));



  //desconecta la base de datos cuando salimos de node con ctrl+c
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});

module.exports = mongoose;
