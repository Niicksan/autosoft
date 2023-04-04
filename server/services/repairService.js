const Service = require("../models/Service");


async function getServiceById(id) {
    return Service.findById(id);
}

async function createService(service) {
    return Service.create(service);
}

async function updateService(service, data) {
    service.title = data.title;
    service.kilometers = data.kilometers;
    service.description = data.description;

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