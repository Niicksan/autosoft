const vehicleController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createVehicle, deleteVehicleById, updateVehicle, getVehicleById } = require('../services/vehicleService');
const { parseError } = require('../utils/errorParser');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');


vehicleController.get('/:id',
    preloader('vehicle'),
    isOwner('vehicle'),
    async (req, res) => {
        const vehicle = global.vehicle;
        res.json(vehicle);
    }
);

vehicleController.post('/create',
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('brand').isLength({ min: 2 }).withMessage('Brand name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    hasUser('vehicle'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.imageUrl == '') {
                delete req.body.imageUrl;
            }

            const vehicle = {
                ...req.body,
                ownerId: req.user._id,
            };
            console.log(vehicle);

            const createdVehicle = await createVehicle(vehicle);
            res.json(createdVehicle);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

vehicleController.patch('/:id',
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('brand').isLength({ min: 2 }).withMessage('Brand name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    preloader('vehicle'),
    isOwner('vehicle'),
    async (req, res) => {
        const vehicle = global.vehicle;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const result = await updateVehicle(vehicle, req.body);
            res.json(result);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

vehicleController.delete('/:id',
    preloader('vehicle'),
    isOwner(),
    async (req, res) => {
        try {
            await deleteVehicleById(req.params.id);
            res.status(200).json({
                messageEn: "Item deleted successfully",
                messageBg: "Успешно изтриване"
            });
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            res.status(400).json({ message });
        }
    }
);

module.exports = vehicleController;