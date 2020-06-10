import axios from "axios";
import { Message } from "element-ui";
import { getToken, setToken } from "@/utils/auth";
import store from "@/vuex";
import router from "@/router";

// axios.defaults.headers.post['Content-Type'] = 'application/json'
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000, // request timeout
  headers: { "Content-Type": "application/json" }
});
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken();
    if (token) {
      config.headers.common["Authorization"] = token;
    }

    config.data = JSON.stringify(config.data);
    // config.headers['Authorization'] = getToken() || ''
    // console.log(localStorage.getItem('token'))
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
    }
    const res = response.data;
    return res;
  },
  error => {
    const rest = error.response;
    console.error(error); // for debug
    if (rest) {
      if (rest.status === 400) {
        Message({ message: rest.data.desc, type: "error" });
      } else if (rest.status === 401) {
        Message({ message: "Please login again!", type: "error" });
        router.push({ path: "/" });
      }
    } else {
      Message({ message: "Api Error, Please Try Again!", type: "error" });
    }
    return Promise.reject(error);
  }
);

export default service;
