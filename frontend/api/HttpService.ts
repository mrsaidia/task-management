import axios, { HttpStatusCode } from "axios";
import { changeUserAuthentication } from "../src/redux/AuthSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${
      store.getState().AuthStore.jwtToken
    }`;
    config.baseURL = "http://localhost:5000/";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === HttpStatusCode.Unauthorized) {
    store.dispatch(changeUserAuthentication(false));
  }
  return Promise.reject(error);
});

export default {
  Get: axios.get,
  Post: axios.post,
  Put: axios.put,
  Delete: axios.delete,
  Patch: axios.patch,
};
