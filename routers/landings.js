const express = require("express");

const router = express.Router();

module.exports = router;

//RUTA BASE `http://localhost:3000/astronomy/landings`



//2. GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)
//- Ejemplo: `/astronomy/landings/mass/200000`
router.get("/mass/:mass?", (req, res) => {
    if (!req.params.mass) res.status(400).send(`DEBES INDICAR EL PARÁMETRO "MASS"`);
    else res.json(req.params)
})


//3. GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)
//- Ejemplo: `/astronomy/landings/class/L6`
router.get("/class/:class?", (req, res, ) => {
    if (!req.params.class) res.status(400).send(`DEBES INDICAR EL PARÁMETRO "CLASS"`);
    else res.json(req.params)
})


//1. GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)
//- Ejemplo: `/astronomy/landings?minimum_mass=200000`
/* 
// 4. GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:
// * `/astronomy/landings?from=1960&to=1990`
//     * `/astronomy/landings?from=1960`
//     * `/astronomy/landings?to=1990`
//     * El mismo endpoint deberá ser compatible con las 3 formas
//ESTE ENDPOINT RECOGERÍA LO QUE NO HA COGIDO EL ENDPOINT 1
// 5. GET para obtener el nombre de la ciudad, país, región o lo que corresponda a partir del nombre del meteorito
// - Ejemplo: `/astronomy/landings/aachen
 */

router.get("/:city?", (req, res, ) => {
    const city = req.params.city;
    const minimum_mass = req.query.minimum_mass;
    const from = req.query.from;
    const to = req.query.to;

    res.send(`minimum_mass ${minimum_mass}, from ${from}, to ${to}, city ${city}`)
})



