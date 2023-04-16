const vehicleController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createVehicle, deleteVehicleById, updateVehicle, getAllVehiclesCreatedByUser } = require('../services/vehicleService');
const { createService, updateService, deleteServiceById } = require('../services/repairService');
const { getAllServiceByVehicleId } = require('../services/repairService');
const { parseError } = require('../utils/errorParser');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');


vehicleController.get('/',
    hasUser(),
    async (req, res) => {
        try {
            const userId = req.user._id;
            const vehicles = await getAllVehiclesCreatedByUser(userId);

            res.json(vehicles);
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            res.status(400).json({ message });
        }
    }
);

vehicleController.get('/:vehicleId/services',
    preloader(),
    isOwner(),
    async (req, res) => {
        const vehicle = res.locals.vehicle;
        const services = await getAllServiceByVehicleId(vehicle._id);

        services.map(x => {
            vehicle.doneServices.push(x);
        });

        res.json(vehicle);
    }
);

vehicleController.post('/',
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('make').isLength({ min: 2 }).withMessage('Make name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    hasUser(),
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

vehicleController.patch('/:vehicleId',
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('make').isLength({ min: 2 }).withMessage('Make name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    preloader(),
    isOwner(),
    async (req, res) => {
        const vehicle = res.locals.vehicle;

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

vehicleController.delete('/:vehicleId',
    preloader(),
    isOwner(),
    async (req, res) => {
        try {
            await deleteVehicleById(req.params.vehicleId);
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

vehicleController.get('/:vehicleId/services/:serviceId',
    preloader(),
    isOwner(),
    async (req, res) => {
        const service = res.locals.service;
        res.json(service);
    }
);

vehicleController.post('/:vehicleId/services',
    check('title').isLength({ min: 2 }).withMessage('Title must be 2 characters long'),
    check('kilometers').isLength({ min: 1 }).withMessage('Kilometers name must be at least 2 characters'),
    check('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    preloader(),
    isOwner(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const service = {
                ...req.body,
                ownerId: req.user._id,
                vehicleId: req.params.vehicleId
            };
            console.log(service);

            const createdService = await createService(service);
            res.json(createdService);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

vehicleController.patch('/:vehicleId/services/:serviceId',
    check('title').isLength(2).withMessage('Title must be 2 characters long'),
    check('kilometers').isLength({ min: 2 }).withMessage('Kilometers name must be at least 2 characters'),
    check('description').isLength({ min: 2 }).withMessage('Description must be at least 2 characters'),
    preloader(),
    isOwner(),
    async (req, res) => {
        const service = res.locals.service;
        console.log(service)
        try {
            const { errors } = validationResult(req);
            console.log(errors);
            console.log(req);

            if (errors.length > 0) {
                throw errors;
            }

            const updatedService = await updateService(service, req.body);
            res.json(updatedService);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

vehicleController.delete('/:vehicleId/services/:serviceId',
    preloader(),
    isOwner(),
    async (req, res) => {
        try {
            await deleteServiceById(req.params.serviceId);
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