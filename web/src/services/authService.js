import { apiUrl } from '../env'
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/users`;

export const authServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        login: (data) => request.post(`${baseUrl}/auth/login`, data),
        register: (data) => request.post(`${baseUrl}/auth/register`, data),
        logout: () => request.get(`${baseUrl}/auth/logout`),
    }
}