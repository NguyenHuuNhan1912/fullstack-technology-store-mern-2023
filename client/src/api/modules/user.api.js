import publicClient from 'api/config/api.services';

const userApi = {
    getAll: () => publicClient.get('user'),
    create: data => publicClient.post('user', data),
    update: (id, data) =>  publicClient.put(`user/${id}`, data),
    delete: (id) => publicClient.delete(`user/${id}`),
    getOne: (id) => publicClient.get(`user/${id}`),
    signUp: (params) => publicClient.get('/user/checkSignup', {params}),
    signIn: (params) => publicClient.get('/user/checkSignin', {params})
};

export default userApi; 