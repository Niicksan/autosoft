const { parseToken } = require("../services/authService");
const { authCookieName } = require("../config/auth-config");


module.exports = () => async (req, res, next) => {
    const token = req.cookies[authCookieName];
    // let token = req.headers['x-authorization'];
    console.log('Session token: ', token);
    if (token) {
        try {
            const payload = await parseToken(token);
            console.log('Session payload: ', payload);
            req.user = payload;
            req.token = token;

            console.log('Session req.user: ', req.user);
            console.log('Session req.token: ', req.token);
        } catch (error) {
            console.log(error);

            res.clearCookie(authCookieName);
            return res.status(401).json({
                messageEn: 'Invalid authorization token',
                messageBg: 'Невалиден тоукън за аутентикация'
            });
        }
    }

    next();
};