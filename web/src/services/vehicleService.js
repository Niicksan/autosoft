import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicle`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllVehicles = async () => {
        const result = await request.get(`${baseUrl}/catalog`);
        const vehicles = Object.values(result);

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

    const editVehicle = (vehicleId, vehicleData) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData);

    const deleteVehicle = async (vehicleId) => {
        const result = await request.delete(`${baseUrl}/${vehicleId}`);
        console.log(result);

        return result;
    }

    return {
        getAllVehicles,
        getVehicleById,
        createVehicle,
        editVehicle,
        deleteVehicle
    };
}