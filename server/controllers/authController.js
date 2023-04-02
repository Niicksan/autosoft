const authController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { authCookieName } = require('../config/auth-config');
const { isGuest } = require('../middlewares/guards');
const { register, login, logout } = require('../services/authService');
const { parseError } = require('../utils/errorParser');


authController.post('/register',
    check('email').isEmail().withMessage('Invalid email'),
    check('companyName').isLength({ min: 2 }).withMessage('Passwords must be longer then 1'),
    check('password').isLength({ min: 5 })
        .withMessage('Passwords must be at least 5 characters long')
        //.matches('[0-9]').withMessage('Паролата трябва да съдържа цифра')
        //.matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        .escape(),
    check('repass').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match');
        }

        return true;
    }),

    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(req.body.email, req.body.companyName, req.body.password);

            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token.authToken, { httpOnly: true, sameSite: 'none', secure: true });
            } else {
                res.cookie(authCookieName, token.authToken, { httpOnly: true });
            }

            res.status(200).json(token);
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            res.status(400).json({ message });
        }
    }
);

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        console.log('Token created on login: ', token);
        if (process.env.NODE_ENV === 'production') {
            console.log('production');
            res.cookie(authCookieName, token.authToken, { httpOnly: true, sameSite: 'none', secure: true });
        } else {
            console.log('dev');
            res.cookie(authCookieName, token.authToken, { httpOnly: true });
        }

        res.status(200).json(token);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(401).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    const token = req.token;
    console.log('Logout token: ', token);
    try {
        if (token) {
            await logout(token);
        }

        console.log('Logged out!');
        res.clearCookie(authCookieName);
        res.status(200).json({
            messageEn: 'Logged out!',
            messageBg: 'Успешно отписване'
        });

        console.log('Cookie cleared!');
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(401).json({ message });
    }
});

module.exports = authController;