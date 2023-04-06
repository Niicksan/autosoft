const profileController = require('express').Router();

const { getUserInfo } = require('../services/userService');
const { parseError } = require('../utils/errorParser');


profileController.get('/user-info', async (req, res) => {
    try {
        const user = await getUserInfo(req.user._id);

        res.json(user);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

module.exports = profileController;