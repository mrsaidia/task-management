import axios from "axios";
import { useSelector } from "react-redux";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = 'application/json'
    config.baseURL = "http://localhost:5000/";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default {
  Get: axios.get,
  Post: axios.post,
  Put: axios.put,
  Delete: axios.delete,
  Patch: axios.patch,
};
