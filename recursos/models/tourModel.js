
const mongoose = require('mongoose');
// SCHEMES
// Son como plantillas del aspecto que tendrán nuestros documentos al insertarlos en nuestra base de datos.
// Su estructura es json --> key: value --> y podemos pasarle opciones como campo requerido, campo único etc...
// Se especifica de qué tipo será nuestra key para un valor simple, y lo convertimos en objeto si queremos pasarle opciones.
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],  // Le podemos pasar opciones a nuestras keys
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});


// Para crear un nuevo documento basado en nuestro Scheme, tenemos que hacer referencia a este.
// Le decimos a mongoose que almacene en una constante un modelo, lo llame Tour y coja las propiedades de tourSchema
const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;