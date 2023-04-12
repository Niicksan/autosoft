import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicles`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getAllVehicles: () => request.get(`${baseUrl}`),
        getVehicleById: (vehicleId) => request.get(`${baseUrl}/${vehicleId}/services`),
        createVehicle: (vehicleData) => request.post(`${baseUrl}/create`, vehicleData),
        editVehicle: (vehicleId, vehicleData) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData),
        deleteVehicle: (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`)
    }
}