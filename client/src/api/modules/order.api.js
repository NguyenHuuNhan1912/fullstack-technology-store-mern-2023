import publicClient from 'api/config/api.services';

const orderApi = {
    getAll: () => publicClient.get('order'),
    searchCart: (params) => publicClient.get('/order/searchCart', {params}),
    filtersStatus:(params) => publicClient.get('/order/filtersStatus', {params}),
    create: data => publicClient.post('order', data),
    update: (id, data) =>  publicClient.put(`order/${id}`, data),
    delete: (id) => publicClient.delete(`order/${id}`),
    getOne: (id) => publicClient.get(`order/${id}`),
};

export default orderApi;