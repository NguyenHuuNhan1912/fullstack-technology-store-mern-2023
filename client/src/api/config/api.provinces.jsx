import axios from 'axios';

const baseURL = 'https://provinces.open-api.vn/api/';

const publicClient = axios.create({
    baseURL
})

export default publicClient;