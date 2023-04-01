const homeController = require('express').Router();


// TODO Replace with the real controller
homeController.get('/', (req, res) => {
    console.log('Home: ', req.user);
    console.log('Home: ', req.token);
    res.send('<h1> REST is running!</h1>');
});

module.exports = homeController;