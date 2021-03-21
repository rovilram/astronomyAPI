// Este archivo contendrá todo lo relacionado con el servidor, el enganche con mongodb y el enganche a través de mongoose
// Utilizaremos muchos datos de nuestro archivo config.env

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config( {path: './config.env'} )
const port = process.env.PORT || 8000;
const app = require('./app.js');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASS);

// Para conectar la base de datos local en vez de atlas como en el ejemplo, sólo tendríamos que cambiar el nombre de "a donde conectarnos", tal que así

// mongoose.connect(process.env.DATABASE__lOCAL)   Y EL RESTO IGUAL 
mongoose.connect( DB, {    // Este método devuelve una promesa, así que la tenemos que consumir
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => {           // La conexión al servidor en este caso sería la promesa resuelta
    console.log('DB connection successfull');
});


// Y le indicamos a express que comience a escuchar por el puerto indicado
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





