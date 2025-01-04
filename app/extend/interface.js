const { get, post } = require("./axios");

// 接口模块
// 用于第三方系统的接口请求
module.exports = {
  post接口: async (data) => {
    return post("https://xxx.com/api/v1/search", {
      data,
      // params: {},
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1OTdjZTMwOGZmZTg0N2Q0YWI3NzcyMmQxN2M0ZmYxOCIsIm5hbWVpZCI6Ijc0NzUxMjMiLCJJZCI6Ijc0NzUxMjMiLCJ1bmlxdWVfbmFtZSI6IuivpeelneS9oOS7gOS5iCIsIk5hbWUiOiLor6XnpZ3kvaDku4DkuYgiLCJ2ZXJzaW9uIjoibUs4IiwibmJmIjoxNzI3ODU4NDMxLCJleHAiOjE3MzI3MTQ4MzEsImlzcyI6InlvdXBpbjg5OC5jb20iLCJkZXZpY2VJZCI6IkQzNkUzNDI0LUFDRjktNERFMi1CNTg3LTM4NDVBNDM5NDlGNiIsImF1ZCI6InVzZXIifQ.YVupzsFjnuxNtttXU03UYI2PbOKT1TDnZOqXd68h_jU",
      },
    });
  },

  get接口: async (params) => {
    return get("https://xxx.com/api/v1/search", {
      params,
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1OTdjZTMwOGZmZTg0N2Q0YWI3NzcyMmQxN2M0ZmYxOCIsIm5hbWVpZCI6Ijc0NzUxMjMiLCJJZCI6Ijc0NzUxMjMiLCJ1bmlxdWVfbmFtZSI6IuivpeelneS9oOS7gOS5iCIsIk5hbWUiOiLor6XnpZ3kvaDku4DkuYgiLCJ2ZXJzaW9uIjoibUs4IiwibmJmIjoxNzI3ODU4NDMxLCJleHAiOjE3MzI3MTQ4MzEsImlzcyI6InlvdXBpbjg5OC5jb20iLCJkZXZpY2VJZCI6IkQzNkUzNDI0LUFDRjktNERFMi1CNTg3LTM4NDVBNDM5NDlGNiIsImF1ZCI6InVzZXIifQ.YVupzsFjnuxNtttXU03UYI2PbOKT1TDnZOqXd68h_jU",
      },
    });
  },
};
