const Vehicle = require("../models/Vehicle");


async function getAllVehiclesCreatedByUser(userId) {
    return Vehicle.find({ ownerId: userId }, { doneServices: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
}

async function getVehicleById(id) {
    return Vehicle.findById(id);
}

async function createVehicle(vehicle) {
    const { vinNumber } = vehicle;
    const existing = await Vehicle.findOne({ vinNumber }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Автомобил с такъв Вин номер съществува');
    }

    return Vehicle.create(vehicle);
}

async function updateVehicle(vehicle, data) {
    const { vinNumber } = data;

    const existing = await Vehicle.findOne({ vinNumber }).collation({ locale: 'en', strength: 2 });

    if (existing && data.vinNumber !== vehicle.vinNumber) {
        throw new Error('Автомобил с такъв Вин номер съществува');
    }

    vehicle.vinNumber = data.vinNumber;
    vehicle.brand = data.brand;
    vehicle.model = data.model;
    vehicle.engine = data.engine;
    vehicle.fuel = data.fuel;
    vehicle.yearOfManufacture = data.yearOfManufacture;
    vehicle.description = data.description;
    vehicle.updatedAt = new Date().toISOString();

    if (data.imageUrl) {
        vehicle.imageUrl = data.imageUrl;
    }

    return vehicle.save();
}

async function deleteVehicleById(id) {
    return Vehicle.findByIdAndDelete(id);
}

module.exports = {
    getAllVehiclesCreatedByUser,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicleById
}