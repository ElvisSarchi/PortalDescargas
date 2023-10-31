import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PUBLIC_URL+'/api/v1',
});
const API = {}

API.login = payload => axiosInstance.post('/portalDocs', payload);

export default API;