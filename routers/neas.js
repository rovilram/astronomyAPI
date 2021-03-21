const express = require("express");
const router = express.Router();

const Neas = require("../models/Neas");
const { route } = require("./landings");


// * Ruta base: `http://localhost:3000/astronomy/neas`

//1. GET para obtener la designación y el período anual en base a la clase orbital del asteroide (con query params)
//- Ejemplo: `/astronomy/neas?class=aten`
router.route("/")
    .get((req, res, next) => {
        const orbitClass = req.query.class;
        if (!orbitClass) next();
        else {
            const filter = {
                orbitClass: RegExp(orbitClass, "gi") //Esta búsqueda la hago con regex
            }
            console.log(filter)
            Neas.find(filter)
                .then(result => {
                    if (JSON.stringify(result) === "[]") {
                        res.status(404)
                            .send(`"${orbitClass}" no encontrado`);
                    }
                    res.send(result);
                })
                .catch(() => res.status(500).send("Error en la base de datos"))
        }
    })

    .get((req, res, next) => {
        const from = req.query.from;
        const to = req.query.to;
        if (!from && !to) next();
        else {
            const filter = {
                discoveryDate: {
                    $gte: (from) ? new Date(from) : new Date("0001-01-01"),
                    $lte: (to) ? new Date(to) : new Date()
                }
            }
            const projection = {
                _id: 0,
                designation: 1,
                discoveryDate: 1,
                periodYr: 1
            }

            Neas.find(filter, projection)
                .then(result => {
                    if (JSON.stringify(result) === "[]") {
                        res.status(404)
                            .send(`"${JSON.stringify(filter)}" no encontrado`);
                    }
                    res.send(result);
                })
                .catch(() => res.status(500).send("Error en la base de datos"))
        }
    })


    .get((req, res, next) => {
        const pha = req.query.pha;
        let filter;
        if (!pha) next();
        else if (pha === 1) {
            filter = {
                pha: "Y",
                moidAu: {
                    $lte: 0.05
                },
                hMag: {
                    $lte: 22.0
                }
            }
        }
        else if (pha === 0) {
            filter = {
                pha: "N",
                moidAu: {
                    $gte: 0.05
                },
                hMag: {
                    $gte: 22.0
                }
            }
        }
        else if (pha === -1) {
            filter = {
                pha: "n/a"
            }
        }
        const projection = {
            _id: 0,
            designation: 1,
            discoveryDate: 1,
            periodYr: 1
        }
        Neas.find(filter, projection)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(() => res.status(500).send("Error en la base de datos"))


    })

router.route("/periods")
    .get((req, res, next) => {
        const from = parseFloat(req.query.from);
        const to = parseFloat(req.query.to);
        let filter;
        if (!from && !to) next();
        else if (from && to) {
            filter = {
                periodYr: {
                    $gte: from,
                    $lte: to
                }
            }
        }
        else if (!from) {
            filter = {
                periodYr: {
                    $lte: to
                }
            }
        }
        else if (!to) {
            filter = {
                periodYr: {
                    $gte: from,
                }
            }
        }
        const projection = {
            _id: 0,
            designation: 1,
            discoveryDate: 1,
            periodYr: 1
        }
        Neas.find(filter, projection)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(() => res.status(500).send("Error en la base de datos"))
    })




module.exports = router;
