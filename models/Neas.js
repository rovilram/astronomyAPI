const { Schema, model } = require("mongoose");

//como no necesitamos introducir datos en la colección landings,
//el schema lo dejamos sin estructurar.
const neasSchema = new Schema({}, {strict: true});
const Neas = model("Neas", neasSchema)

module.exports = Neas;

