
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Referenciamos express en la constante app
const app = express();

// 1) Middlewares
// Nos entra una request y ocurre lo siguiente...

// Es parseado (lo que hacía body-parser)
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// Pasa por el siguiente middleware, que sólo lo hice como prueba para ver que aparecía.

// Aquí podríamos llamar a next como quisieramos, pero es un estandar y tiene más sentido. Lo importante es que tiene que ser el terder argumento. Pasa igual con req, res... Se pueden llamar de cualquier forma, pero es un estandar muy legible.
// Este middleware aplica a todas las request que nos lleguen
app.use( (req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

// Pasa por este, que le coloca la fecha, hora etc... de la request y la convierte a ISOstring
app.use( (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Y la request llega aquí, donde le decimos a nuestra app que según el endpoint que le llega, use un enrutador u otro y se va hacia el archivo indicado, exportando nuestra app hacia dichos archivos.
// 3) ROUTES
// Montamos las rutas que hemos importado desde los archivos que forman como una sub aplicación. Archivos separados donde montamos las rutas
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// De aquí se iría hasta el archivo indicado según endpoint. Si suera que nos llega un endpoint para coger un tour por su id, nos iríamos al tourRoutes
module.exports = app;




















