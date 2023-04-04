const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const vehicleController = require('../controllers/vehicleController');
const serviceController = require('../controllers/serviceController');


module.exports = (app) => {
    // Routes
    app.use('/', homeController);
    app.use('/api/auth', authController);
    app.use('/api/vehicle', vehicleController);
    app.use('/api/service', serviceController);
};