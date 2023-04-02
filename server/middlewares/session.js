const { parseToken } = require("../services/authService");
const { authCookieName } = require("../config/auth-config");


module.exports = () => async (req, res, next) => {
    // const cookieToken = req.cookies[authCookieName];
    let authToken = req.headers['x-authorization'];

    // console.log('Session cookieToken: ', cookieToken);
    console.log('Session authToken: ', authToken);
    if (authToken) {
        try {
            const payload = await parseToken(authToken);
            console.log('Session payload: ', payload);
            req.user = payload;
            req.token = authToken;

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