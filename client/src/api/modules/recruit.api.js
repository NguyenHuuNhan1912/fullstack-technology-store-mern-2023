import publicClient from 'api/config/api.services';

const recruitApi = {
    getAll: () => publicClient.get('recruit'),
    create: data => publicClient.post('recruit', data),
};

export default recruitApi;