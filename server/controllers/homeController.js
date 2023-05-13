const homeController = require('express').Router();


// TODO Replace with the real controller
homeController.get('/', (req, res) => {
    res.send('<h1> REST is running!</h1>');
});

module.exports = homeController;