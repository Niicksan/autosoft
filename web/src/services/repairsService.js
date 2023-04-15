import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicles`;

export const repairsServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        // getAllServices: (id) => request.post(`${baseUrl}/catalog`, id),
        getServiceById: (vehicleId, serviceId) => request.get(`${baseUrl}/${vehicleId}/services/${serviceId}`),
        createService: (serviceData, vehicleId) => request.post(`${baseUrl}/${vehicleId}/services/create`, serviceData),
        editService: (vehicleId, serviceId, serviceData) => request.patch(`${baseUrl}/${vehicleId}/services/${serviceId}`, serviceData),
        deleteService: (vehicleId, serviceId) => request.delete(`${baseUrl}/${vehicleId}/services/${serviceId}`)
    }
}