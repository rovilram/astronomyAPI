const express = require("express");
const router = express.Router();
const Landing = require("../models/Landing");



//RUTA BASE ENDPOINTS `http://localhost:3000/astronomy/landings`
//2. GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)
//- Ejemplo: `/astronomy/landings/mass/200000`
router.get("/mass/:mass?", (req, res) => {
    const mass = parseInt(req.params.mass);
    if (!mass) res.status(400).send(`DEBES INDICAR EL PARÁMETRO ENTERO "MASS"`);
    else {
        const filter = {
            mass: mass
        }
        const projection = {
            _id: 0,
            name: 1,
            mass: 1
        }
        Landing.find(filter, projection)
            .then(result => {
                //TODO: no se porque no reconoce cuando el array viene vacío y tengo que
                //hacer la ñapa de convertirlo a string para poderlo reconocer...
                // console.log(result);
                // console.log(`"${JSON.stringify(result)}"`)
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(error => res.sendStatus(400, error))


    }
})


//3. GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)
//- Ejemplo: `/astronomy/landings/class/L6`
router.get("/class/:class?", (req, res) => {
    const recclass = req.params.class;
    if (!recclass) res.status(400).send(`DEBES INDICAR EL PARÁMETRO "CLASS"`);
    else {
        const filter = {
            recclass: recclass
        };
        const projection = {
            _id: 0,
            name: 1,
            recclass: 1
        };
        Landing.find(filter, projection)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(error => res.sendStatus(400, error))
    }
})

// 5. GET para obtener el nombre de la ciudad, país, región o lo que corresponda a partir del nombre del meteorito
// - Ejemplo: `/astronomy/landings/aachen
router.get("/:name?", (req, res, next) => {
    const name = req.params.name;
    if (!name) next(); //pasamos al siguiente endpoint
    else {
        const filter = {
            name: name
        }

        Landing.find(filter)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                else res.send(result[0].toJSON().geolocation);
            })
            .catch(error => {
                console.log(error)
                res.status(500).send(`Ha habido un error: ${error}`);
            })
    }
})



//1. GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)
//- Ejemplo: `/astronomy/landings?minimum_mass=200000`
router.get("/", (req, res, next) => {
    const minimum_mass = req.query.minimum_mass;
    if (!minimum_mass) next(); //pasamos al siguiente endpoint
    else {
        const filter = {
            mass: {
                $gte: parseInt(minimum_mass)
            }
        }
        const projection = {
            _id: 0,
            name: 1,
            mass: 1
        }
        console.log(filter, projection)

        Landing.find(filter, projection)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(error => res.sendStatus(400, error))
    }
})

/* 
// 4. GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:
// * `/astronomy/landings?from=1960&to=1990`
//     * `/astronomy/landings?from=1960`
//     * `/astronomy/landings?to=1990`
//     * El mismo endpoint deberá ser compatible con las 3 formas
 */
router.get("/", (req, res, next) => {
    const from = req.query.from;
    const to = req.query.to;
    if (!from && !to) next();
    else {
        const filter = {
            year: {
                $gte: (from) ? new Date(from) : new Date("0001-01-01"),
                $lte: (to) ? new Date(to) : new Date()
            }
        }
        const projection = {
            _id: 0,
            name: 1,
            mass: 1,
            year: 1
        }
        console.log(projection)
        Landing.find(filter, projection)
            .then(result => {
                if (JSON.stringify(result) === "[]") {
                    res.status(404)
                        .send(`"${JSON.stringify(filter)}" no encontrado`);
                }
                res.send(result);
            })
            .catch(error => res.sendStatus(400, error))
    }
})

module.exports = router;
