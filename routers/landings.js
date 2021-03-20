const express = require("express");


const router = express.Router();


module.exports = router;


//TODO: ver como sacar esta función a otro archivo y que nos sirva para las otras colecciones
const find = async (filter) => {
    const db = require("../database/mongoose");
    const Landing = require("../models/Landing");
    try {
        await db.dbConnect();
        const response = await Landing.find(filter);
        await db.connection.close(() => {
            console.info('> mongoose succesfully disconnected!');
        })
        return (response);
    }
    catch (error) {
        console.log("error", error)
        throw (error);
    }
}

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
        find(filter)
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
        find(filter)
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

        find(filter)
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
        console.log(filter)

        find(filter)
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
    let filter;
    if (!from && !to) next();
    else {
        const fromDate = (`${parseInt(from)}-01-01T00:00:01`);
        const toDate = (`${parseInt(to)}-12-31T23:59:59`);

        //TODO: hacer un filter para los tres casos. Y ver cuando el año no tiene 3 cifras
        if (from && to) {
            filter = {
                year: {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate)
                }
            }
        }
        else if (!from) {
            filter = {
                year: {
                    $lte: new Date(toDate)
                }
            }
        }
        else if (!to) {
            filter = {
                year: {
                    $gte: new Date(fromDate),
                }
            }
        }

        find(filter)
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

