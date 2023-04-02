const Service = require("../models/Service");


async function getServiceById(id) {
    return Service.findById(id);
}

async function createService(service) {
    return Service.create(service);
}

async function updateService(service, data) {
    title.vinNumber = data.vinNumber;
    kilometers.brand = data.brand;
    description.model = data.model;

    return service.save();
}

async function deleteServiceById(id) {
    return Service.findByIdAndDelete(id);
}

module.exports = {
    getServiceById,
    createService,
    updateService,
    deleteServiceById
}