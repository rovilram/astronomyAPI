const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.route("/")
    .post(async (req, res) => {
        try {
            const newUser = new User(req.body);
            const response = await newUser.save();
            res.send(response);
        }
        catch (error) {
            console.log(error);
            //TODO: hay que hacer bién la gestión de errores, para que saca el status necesario en cada caso
            res.status(500).send(error)
        }
    })

router.route("/:affiliatedNumber")
    .get(async (req, res) => {
        const affiliatedNumber = req.params.affiliatedNumber;
        const filter = {
            affiliatedNumber: affiliatedNumber
        };
        const projection = {
            _id: 0,
            name: 1,
            birthday: 1,
            occupation: 1,
            affiliatedNumber: 1,
            astronomicalPoints: 1,
            affiliationDate: 1
        }
        const result = await User.findOne(filter, projection);
        if (!result) {
            res.status(404)
                .send(`"${JSON.stringify(filter)}" no encontrado`);
        }
        res.send(result);
    })

    .put(async (req, res) => {
        try {
            const filter = {
                affiliatedNumber: parseInt(req.params.affiliatedNumber)
            }
            const document = {
                nickname: req.body.nickname,
                occupation: req.body.occupation
            }
            const response = await User.updateOne(filter, document)
            if (response.n === 0) res.status(404).send(`no se ha encontrado ${req.params.affiliatedNumber}`);
            else if (response.nModified === 0) res.status(400).send("no se ha modificado ningún valor");
            res.send(response);
        }
        catch (error) {
            console.log(error);
            //TODO: hay que hacer bién la gestión de errores, para que saca el status necesario en cada caso
            res.status(500).send(error)
        }
    })

    .delete(async (req, res) => {
        try {
            const filter = {
                affiliatedNumber: parseInt(req.params.affiliatedNumber)
            }
            const response = await User.deleteOne(filter)
            if (response.n === 0) res.status(404).send(`no se ha encontrado ${req.params.affiliatedNumber}`);
            else if (response.nModified === 0) res.status(400).send("no se ha borrado ningún registro");
            res.send(response);
        }
        catch (error) {
            console.log(error);
            //TODO: hay que hacer bién la gestión de errores, para que saca el status necesario en cada caso
            res.status(500).send(error)
        }
    })




router.route("/:affiliatedNumber/badges")
    .get(async (req, res) => {
        const affiliatedNumber = parseInt(req.params.affiliatedNumber);
        User.aggregate([
            { $unwind: "$badges" },
            { $match: { "badges.given": true, affiliatedNumber: affiliatedNumber } },
            { $project: { badges: 1 } }])
            .exec((err, result) => {
                if (err) req.statusCode(500).send(err)
                if (JSON.stringify(result) === "[]") res.status(404).send("No se encuentran datos")
                res.send(result)
            })
    })
router.route("/:affiliatedNumber/neas")
    .get(async (req, res) => {
        const affiliatedNumber = parseInt(req.params.affiliatedNumber);
        const filter = {
            affiliatedNumber: affiliatedNumber
        };
        const projection = {
            _id: 0,
            neasDiscovered: 1
        }
        const result = await User.findOne(filter, projection);
        if (!result) {
            res.status(404)
                .send(`"${JSON.stringify(filter)}" no encontrado`);
        }
        res.send(result);
    })

router.route("/:affiliatedNumber/necs")
    .get(async (req, res) => {
        const affiliatedNumber = parseInt(req.params.affiliatedNumber);
        const filter = {
            affiliatedNumber: affiliatedNumber
        };
        const projection = {
            _id: 0,
            necsDiscovered: 1
        }
        const result = await User.findOne(filter, projection);
        if (!result) {
            res.status(404)
                .send(`"${JSON.stringify(filter)}" no encontrado`);
        }
        res.send(result);
    })


router.route("/:affiliatedNumber/points")
    .get(async (req, res) => {
        const affiliatedNumber = parseInt(req.params.affiliatedNumber);
        const filter = {
            affiliatedNumber: affiliatedNumber
        };
        const projection = {
            _id: 0,
            astronomicalPoints: 1
        }
        const result = await User.findOne(filter, projection);
        if (!result) {
            res.status(404)
                .send(`"${JSON.stringify(filter)}" no encontrado`);
        }
        res.send(result);
    })


router.route("/:affiliatedNumber/delete")
    .put(async (req, res) => {
        try {
            const filter = {
                affiliatedNumber: parseInt(req.params.affiliatedNumber)
            }
            const document = {
                deleted: true //lo voy a hacer sin ver lo que viene en body
            }
            const response = await User.updateOne(filter, document)
            if (response.n === 0) res.status(404).send(`no se ha encontrado ${req.params.affiliatedNumber}`);
            else if (response.nModified === 0) res.status(400).send("no se ha modificado ningún valor");
            res.send(response);
        }
        catch (error) {
            console.log(error);
            //TODO: hay que hacer bién la gestión de errores, para que saca el status necesario en cada caso
            res.status(500).send(error)
        }
    })

//TODO: Ver como organizar los enrutadores de forma que se puedan reutilizar los de /astronomy/guild/numAfiliacion/METODOS
//TODO: ver como quitar el error warning Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client




module.exports = router;
