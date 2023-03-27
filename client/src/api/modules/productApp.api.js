import publicClient from 'api/config/api.services';

const productAppApi = {
    getAll: (params) => publicClient.get('productApp', {params}),
    // create: data => publicClient.post('products', data),
    // update: (id, data) =>  publicClient.put(`products/${id}`, data),
    // delete: (id) => publicClient.delete(`products/${id}`),
    // getOne: (id) => publicClient.get(`products/${id}`),
    // update: (id, data) => publicClient.put(`product/${id}`, data),
    // delete: id => publicClient.delete(`product/${id}`),
    // search: value => publicClient.get('product/search', { params: { q: value } })
};

export default productAppApi;