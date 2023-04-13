import publicClient from 'api/config/api.services';

const categoryApi = {
    getAll: () => publicClient.get('category'),
    create: data => publicClient.post('category', data),
    update: (id, data) =>  publicClient.put(`category/${id}`, data),
    delete: (id) => publicClient.delete(`category/${id}`)
};

export default categoryApi;