/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  
  config.multipart = {
    mode: "file",
    files: "100",
    fileSize: "10mb",
    whitelist: [".json", ".jpg", ".jpeg", ".png", ".gif"],
  };
  config.session = {
    key: "your_session_key",
    httpOnly: true,
    encrypt: true,
  };
  // 安全
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 配置白名单
    domainWhiteList: ["*"],
  };
  config.cors = {
    // origin: '*', // 如果不写origin则会按照白名单中的域名允许跨域 * 代表允许所有的域名进行跨域请求
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    credentials: true,
  };
  // add your middleware config here
  config.middleware = ["errorHandler"];

  // add your user config here
  const userConfig = {
    myAppName: 'egg.js',
  };
  
  return {
    ...config,
    ...userConfig,
  };
};
