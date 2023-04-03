import publicClient from "api/config/api.provinces";

const provincesApi = {
    getAll: (type, code, params) => {
        if (code !== '') {
            return publicClient.get(`/${type}/${code}`, { params });
        }
        else {
            return publicClient.get(`/${type}/`, { params });
        }
    }
}

export default provincesApi;