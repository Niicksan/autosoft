import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/service`;

export const repairsServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getAllServices: (id) => request.post(`${baseUrl}/catalog`, id),
        // getVehicleById: (vehicleId) => request.get(`${baseUrl}/${vehicleId}`),
        // createVehicle: (vehicleData) => request.post(`${baseUrl}/create`, vehicleData),
        // editVehicle: (vehicleId, vehicleData) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData),
        // deleteVehicle: (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`)
    }
}