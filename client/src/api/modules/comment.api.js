import publicClient from 'api/config/api.services';

const commentApi = {
    getAll: () => publicClient.get('comment'),
    create: data => publicClient.post('comment', data),
    delete: (id) => publicClient.delete(`comment/${id}`),

};

export default commentApi;