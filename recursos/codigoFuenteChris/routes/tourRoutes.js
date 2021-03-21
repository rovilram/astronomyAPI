
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController.js');

// La petición llegaría aquí. Según el tipo de petición, entraría en una ruta u otra.
// En este caso, nos llegaría una petición de tipo GET para un sólo tour y como parámetro de petición (queryParam) nos llega un ID.
// La petición se iría por  router/route('/:id').get(tourController.getTour)

// ESTO VALIDARÍA LLAMANDO A CHECKID SI EL ID EXISTE O NO
// router.param('id', tourController.checkID);


// Tours
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
    // .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;


