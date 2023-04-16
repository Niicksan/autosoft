const contactsController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createContact } = require('../services/contactsService');
const { parseError } = require('../utils/errorParser');

contactsController.post('/',
    check('name').isLength({ min: 1 }).withMessage('Please enter your name'),
    check('email').isEmail().withMessage('Invalid email'),
    check('subject').isLength({ min: 1 }).withMessage('Please enter a subject'),
    check('message').isLength({ min: 20 }).withMessage('Please enter a detailed message'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            await createContact(req.body);
            res.json({
                messageEn: "Message is sent successfully!",
                messageBg: "Съобщението е изпратено успешно!"
            });
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            res.status(400).json({ message });
        }
    }
);

module.exports = contactsController;