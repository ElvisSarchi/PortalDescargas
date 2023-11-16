import axios from "axios";

const baseURL = import.meta.env.PUBLIC_URL + "/api/v1";
const axiosInstance = axios.create({
  baseURL,
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
const axiosInstancedos = axios.create({
  baseURL,
  validateStatus() {
    return true;
  },
});
axiosInstancedos.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error)
);
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
API.getPDF = (payload) =>
  axiosInstancedos.post(`/portalDocs/getPDF`, payload, {
    responseType: `arraybuffer`,
  });
API.getXML = (payload) =>
  axiosInstancedos.post(`/portalDocs/getXML`, payload, {
    responseType: `arraybuffer`,
  });
API.updateProfile = (payload) =>
  axiosInstance.post(`/portalDocs/updateProfile`, payload);

export default API;
