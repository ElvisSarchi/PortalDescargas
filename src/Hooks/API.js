import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_URL + "/api/v1",
});
const requestHandler = (config) => {
  const token = localStorage.getItem(`token`) ?? ``;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
const responseHandler = (response) => {
  const {
    data: { data, error, success },
  } = response;
  if (success) {
    return data;
  } else {
    return Promise.reject(error);
  }
};
axiosInstance.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error)
);
axiosInstance.interceptors.response.use(responseHandler, (error) =>
  Promise.reject(error)
);
const API = {};

API.login = (payload) => axiosInstance.post("/portalDocs", payload);
API.verify = () => axiosInstance.get("/portalDocs/me");
API.getDocuments = () => axiosInstance.get("/portalDocs/getDocuments");

export default API;
