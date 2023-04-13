import publicClient from 'api/config/api.services';

const productApi = {
    getAll: (params) => publicClient.get('products', {params}),
    filtersName: (params) => publicClient.get('products/filtersName', {params}),    
    fillDiscount: () => publicClient.get('discount'),
    create: data => publicClient.post('products', data),
    update: (id, data) =>  publicClient.put(`products/${id}`, data),
    delete: (id) => publicClient.delete(`products/${id}`),
    getOne: (id) => publicClient.get(`products/${id}`),
};

export default productApi;