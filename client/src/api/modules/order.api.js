import publicClient from 'api/config/api.services';

const orderApi = {
    getAll: () => publicClient.get('order'),
    searchCart: (params) => publicClient.get('/order/searchCart', {params}),
    create: data => publicClient.post('order', data),
    update: (id, data) =>  publicClient.put(`order/${id}`, data),
    delete: (id) => publicClient.delete(`order/${id}`),
    getOne: (id) => publicClient.get(`order/${id}`),
    // update: (id, data) => publicClient.put(`product/${id}`, data),
    // delete: id => publicClient.delete(`product/${id}`),
    // search: value => publicClient.get('product/search', { params: { q: value } })
};

export default orderApi;