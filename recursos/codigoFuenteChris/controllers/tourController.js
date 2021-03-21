
const Tour = require('./../models/tourModel.js');

// READ DOCUMENTS EN MONGOOSE
exports.getAllTours = async (req, res) => {

    try {

        const allTours = await Tour.find();
        
        res.status(200).json({
            status: 'success',
            data: {
                results: allTours.length,
                tours: allTours
            }

        });

    } catch(err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }
};

// READ DOCUMENTS EN MONGOOSE BY ID (QUERY PARAMS)
exports.getTour = async (req, res) => {
    // convertimos el id que nos pasa front por req.params en número, porque viene, evidentemente, como string.
    try {
        const id = Number( req.params.id );
        const oneTour = await Tour.findById(req.params.id);
        // findById --> Tour.find( {_id: req.params.id} )

        res.status(200).json({
            status: 'Success',
            data: {
                tour: oneTour
            }
        })

    } catch(err) {
        res.status(404).json({
            status: 'Fail',
            message: 'Id is not valid'
        })
    }

        

    // const tour = toursData.find( cur => cur.id === id);

    // Una solución para manejar el error de que no exista ningún tour con el id pasado por front
    // if(id > toursData.length ) {
    //     res.status(404).json({
    //         status: 'Error',
    //         message: 'Invalid ID'
    //     });
    // }else {

        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         tours: tour
        //     }
        // });

    // };

    // La segunda solución sería más simple
    // if(!tour) {

    //     return res.status(404).json({
    //         status: 'Fail',
    //         message: 'Invalid key identificator'
    //     });

    // }else {

    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             tours: tour
    //         }
    //     });
    // };
};

// CREATE DOCUMENT EN MONGOOSE
exports.createTour = async (req, res) => {
    /*  FORMA NORMAL
    const newTour = new Tour({});
    newTour.save()
    */

    // FORMA ABREVIADA. Directamente es el modelo constructor el que crea

    try {

        const newTour = await Tour.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data sent!'
        })
    }
}

// ACTUALIZAR/MODIFICAR DOCUMENTOS EN MONGOOSE
exports.updateTour = async (req, res) => {
  
    try {
        const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour: updateTour
            }
        });


    } catch(err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }

    
};

// BORRAR DOCUMENTOS EN MONGOOSE
exports.deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id);
            
        res.status(204).json({
            status: 'Succesfull Deletion',
            data: null
        });


    }catch(err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        });
    };
};