const route = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Landings = require('../models/Landings');
// Endpoints relativos a Landings
// Recuperamos name, mass y year. Filtramos por ?from=2005&to=2010
// req.query = {
//   from: 2005,
//   to: 2010
// }
route.get('/', async (req, res, next) => {
  try {
    const from = req.query.from;
    const to = req.query.to;
    if (!from && !to) next(); //HE AÑADIDO ESTA LINEA
    const landings = await Landings.find(
      {
          year: {
          $gte: from,
          $lte: to,
        },
      },
      // Recupero solamente estos campos de los landings
      {
        name: 1,
        mass: 1,
        year: 1,
      }
    );
    res.status(200).json({
      data: landings,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      ok: false,
    });
  }
});
//1.GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)/astronomy/landings?minimum_mass=200000
route.get('/', async (req, res, next) => {
  try {
    const minimum_mass = req.query.mass;
    const landings = await Landings.find(
      {
        mass: {
          $gte: minimum_mass
        },
      },
      // Recupero solamente estos campos de los landings
      {
        name: 1,
        mass: 1,
      }
    );
    res.status(200).json({
      data: landings,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      ok: false,
    });
  }
});
//2.GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params) /astronomy/landings/mass/200000
route.get('/', async (req, res, next) => {
  try {
    const mass = req.params.mass;
    const landings = await Landings.find(
      {
        mass: {
          $eq: mass
                },
      },
      // Recupero solamente estos campos de los landings
      {
        name: 1,
        mass: 1,
      }
    );
    res.status(200).json({
      data: landings,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      ok: false,
    });
  }
});
//3.GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)
//Ejemplo: /astronomy/landings/class/L6
route.get('/', async (req, res, next) => {
  try {
    const recclass  = req.params.recclass;
    const landings = await Landings.find(
      {
        mass: {
          $eq: recclass
                },
      },
      // Recupero solamente estos campos de los landings
      {
        name: 1,
        mass: 1,
      }
    );
    res.status(200).json({
      data: landings,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      ok: false,
    });
  }
});
module.exports = route;