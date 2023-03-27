import publicClient from 'api/config/api.services';

const cartApi = {
    getAll: () => publicClient.get('cart'),
    create: data => publicClient.post('cart', data),
    update: (id, data) =>  publicClient.put(`cart/${id}`, data),
    delete: (id) => publicClient.delete(`cart/${id}`),
    getOne: (id) => publicClient.get(`cart/${id}`),
    searchIdUser: (params) => publicClient.get('/cart/searchIdUser', {params}),
    // update: (id, data) => publicClient.put(`product/${id}`, data),
    // delete: id => publicClient.delete(`product/${id}`),
    // search: value => publicClient.get('product/search', { params: { q: value } })
};

export default cartApi;