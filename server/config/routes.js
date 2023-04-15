const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const vehicleController = require('../controllers/vehicleController');
const profileController = require('../controllers/profileController');


module.exports = (app) => {
    // Routes
    app.use('/', homeController);
    app.use('/api/auth', authController);
    app.use('/api/vehicles', vehicleController);
    app.use('/api/user/profile', profileController);
};