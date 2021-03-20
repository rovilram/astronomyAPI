const { Schema, model } = require("mongoose");


const landingSchema = new Schema({}, {strict: true});
const Landing = model("Landing", landingSchema)

module.exports = Landing;




/*

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({}, { strict: false });
const Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = { Product };

*/