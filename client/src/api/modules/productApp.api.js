import publicClient from 'api/config/api.services';

const productAppApi = {
    getAll: (params) => publicClient.get('productApp', {params}),
    getProducts: () => publicClient.get('productApp/all'),
};

export default productAppApi;