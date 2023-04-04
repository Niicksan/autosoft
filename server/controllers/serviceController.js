const serviceController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createService, updateService, deleteServiceById } = require('../services/repairService');
const { parseError } = require('../utils/errorParser');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');


serviceController.get('/:id',
    preloader('service'),
    isOwner('service'),
    async (req, res) => {
        const service = res.locals.service;
        res.json(service);
    }
);

serviceController.post('/create',
    check('title').isLength(2).withMessage('Title must be 2 characters long'),
    check('kilometers').isLength({ min: 2 }).withMessage('Kilometers name must be at least 2 characters'),
    check('description').isLength({ min: 2 }).withMessage('Description must be at least 2 characters'),
    isOwner('vehicle'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }
            console.log("vehicle: ", global.vehicle)
            const service = {
                ...req.body,
                ownerId: req.user._id,
                vehicleId: global.vehicle._id
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

serviceController.patch('/:id',
    check('title').isLength(2).withMessage('Title must be 2 characters long'),
    check('kilometers').isLength({ min: 2 }).withMessage('Kilometers name must be at least 2 characters'),
    check('description').isLength({ min: 2 }).withMessage('Description must be at least 2 characters'),
    preloader('service'),
    isOwner('service'),
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

serviceController.delete('/:id',
    preloader('service'),
    isOwner('service'),
    async (req, res) => {
        try {
            await deleteServiceById(req.params.id);
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

module.exports = serviceController;