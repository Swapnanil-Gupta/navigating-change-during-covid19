import axiosMain from "axios";
import qs from "qs";

const axios = axiosMain.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params),
});

export default axios;
