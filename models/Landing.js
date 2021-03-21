const { Schema, model } = require("mongoose");

//como no necesitamos introducir datos en la colección landings,
//el schema lo dejamos sin estructurar.
const landingSchema = new Schema({}, {strict: true});
const Landing = model("Landing", landingSchema)

module.exports = Landing;

