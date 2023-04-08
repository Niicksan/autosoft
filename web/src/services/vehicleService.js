import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicle`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getAllVehicles: () => request.get(`${baseUrl}/catalog`),
        getVehicleById: (vehicleId) => request.get(`${baseUrl}/${vehicleId}`),
        createVehicle: (vehicleData) => request.post(`${baseUrl}/create`, vehicleData),
        editVehicle: (vehicleId, vehicleData) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData),
        deleteVehicle: (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`)
    }
}