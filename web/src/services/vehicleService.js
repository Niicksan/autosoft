import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicle`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllVehicles = async () => {
        const result = await request.get(`${baseUrl}/catalog`);
        console.log(result);
        const vehicles = Object.values(result);
        console.log(vehicles);

        return vehicles;
    };

    const getVehicleById = async (vehicleId) => {
        const vehicle = await request.get(`${baseUrl}/${vehicleId}`);

        return vehicle;
    };

    const createVehicle = async (vehicleData) => {
        const vehicle = await request.post(`${baseUrl}/create`, vehicleData);

        console.log(vehicle);

        return vehicle;
    };

    const editVehicle = (vehicleId, vehicleData) => request.put(`${baseUrl}/${vehicleId}`, vehicleData);

    const deleteVehicle = (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`);

    return {
        getAllVehicles,
        getVehicleById,
        createVehicle,
        editVehicle,
        deleteVehicle
    };
}