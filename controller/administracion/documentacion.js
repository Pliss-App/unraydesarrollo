const express = require('express');
const isRouter = express.Router();

const isController = require('../../models/administracion/documentacion');


isRouter.get('/afiliaciones-enviadas', async (req, res) => {
    try {
        const result = await isController.getListEnviado();
        if (result === undefined) {
            return res.status(200).send({
                success: false,
                msg: 'No se encontro data',
            });
        } else {
            return res.status(200).send({
                success: true,
                msg: 'SUCCESSFULLY',
                result: result
            });
        }

    } catch (error) {
        console.error(error)
    }

})



isRouter.get('/detalle-vehiculos/:id', async (req, res) => {
    try {
        const result = await isController.getDatosVehiculoId(req.params.id);
        if (result === undefined) {
            return res.status(200).send({
                success: false,
                msg: 'No se encontro data',
            });
        } else {
            return res.status(200).send({
                success: true,
                msg: 'SUCCESSFULLY',
                result: result
            });
        }

    } catch (error) {
        console.error(error)
    }

})

module.exports = isRouter;