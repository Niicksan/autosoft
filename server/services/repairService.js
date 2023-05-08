const Service = require("../models/Service");

async function getAllServiceByVehicleId(id) {
    return Service.find({ vehicleId: id }, { updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
}

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
    service.updatedAt = new Date().toISOString();

    return service.save();
}

async function deleteServiceById(id) {
    return Service.findByIdAndDelete(id);
}

async function deleteAllServiceByVehicleId(id) {
    return Service.deleteMany({ vehicleId: id });
}

module.exports = {
    getAllServiceByVehicleId,
    getServiceById,
    createService,
    updateService,
    deleteServiceById,
    deleteAllServiceByVehicleId
}