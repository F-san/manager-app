import axios from "axios";
import { message } from "antd";
import { serverUrl } from "./tools";
import { getToken } from "./auth";
// 创建一个‘实例’
const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
});

/* 全局请求拦截 */
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config["headers"]["authorization"] = "Bearer " + getToken();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
/* 全局响应拦截 */
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.dir(error);
    // 若401未授权，则跳转到登陆页面
    if (error.response && error.response.status === 401) {
      message.error("请登录！");
      window.location.href = "/#/login";
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @param {*} url  请求地址
 * @param {} params  url传进的参数
 */
export const get = (url, params) => instance.get(url, { params });

/**
 * post请求
 * @param {*} url 地址
 * @param {*} data 数据
 */
export const post = (url, data) => instance.post(url, data);

/**
 * put请求
 * @param {*} url 地址
 * @param {*} data 数据
 */
export const put = (url, data) => instance.put(url, data);

/**
 * delete请求
 * @param {*} url 地址
 */
export const del = (url) => instance.delete(url);

export default instance;
