const axios = require("axios");

// TODO: 用 httpclient 重写，补单元测试 https://www.eggjs.org/zh-CN/core/httpclient
const service = axios.create({
  timeout: 60000,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false
  // })
});
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

module.exports = {
  get(url, options = {}) {
    return service.get(url, options);
  },
  post(url, { data, ...options }) {
    return service.post(url, data, options);
  },
};
