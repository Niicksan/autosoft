import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicles`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getAllVehicles: () => request.get(`${baseUrl}`),
        getVehicleById: (vehicleId) => request.get(`${baseUrl}/${vehicleId}/services`),
        createVehicle: (vehicleData) => request.post(`${baseUrl}`, vehicleData),
        editVehicle: (vehicleData, vehicleId) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData),
        deleteVehicle: (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`),
        getServiceById: (vehicleId, serviceId) => request.get(`${baseUrl}/${vehicleId}/services/${serviceId}`),
        createService: (serviceData, vehicleId) => request.post(`${baseUrl}/${vehicleId}/services`, serviceData),
        editService: (serviceData, vehicleId, serviceId) => request.patch(`${baseUrl}/${vehicleId}/services/${serviceId}`, serviceData),
        deleteService: (vehicleId, serviceId) => request.delete(`${baseUrl}/${vehicleId}/services/${serviceId}`)
    }
}