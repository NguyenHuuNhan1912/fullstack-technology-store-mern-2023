import publicClient from 'api/config/api.services';

const contactApi = {
    getAll: () => publicClient.get('contact'),
    create: data => publicClient.post('contact', data),
};

export default contactApi;