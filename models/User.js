const { Schema, model } = require("mongoose");


const usersSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    nickname: String,
    affiliatedNumber: {
        type: Number,
        required: true,
        index: true,
        unique: true

    },
    affiliationDate: Date,
    occupation: String,
    birthday: Date,
    deleted: Boolean,
    astronomicalPoints: Number,
    badges: [
        {
            name: String,
            given: Boolean,
            info: String,
            points: Number,
            _id: false
        }
    ],
    neasDiscovered: [String],
    necsDiscovered: [String],
}, { strict: true });


const User = model("User", usersSchema);

//Es necesario hacer esto para que unique funcione
User.createIndexes();

module.exports = User;