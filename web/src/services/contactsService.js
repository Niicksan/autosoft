import { apiUrl } from '../env'
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/contacts`;

export const contactsServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        sentMessage: (data) => request.post(`${baseUrl}`, data)
    }
}