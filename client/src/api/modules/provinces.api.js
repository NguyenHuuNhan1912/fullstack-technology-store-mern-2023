import publicClient from "api/config/api.provinces";

const provincesApi = {
    getAll: (type, code, params) => {
        return (code !== '') 
            ? 
            publicClient.get(`/${type}/${code}`, { params }) 
            : publicClient.get(`/${type}/`, { params })
    }
}

export default provincesApi;