import publicClient from 'api/config/api.services';

const categoryApi = {
    getAll: () => publicClient.get('category'),
    create: data => publicClient.post('category', data),
    update: (id, data) =>  publicClient.put(`category/${id}`, data),
    delete: (id) => publicClient.delete(`category/${id}`)
    // update: (id, data) => publicClient.put(`category/${id}`, data),
    // delete: id => publicClient.delete(`category/${id}`),
    // search: value => publicClient.get('category/search', { params: { q: value } })
};

export default categoryApi;