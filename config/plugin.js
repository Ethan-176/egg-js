module.exports = {
  // 配置 路由拆分 egg-router-plus 前缀使用
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
  // 引入 egg-sequelize
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  redis: {
    enable: true,
    package: "egg-redis",
  },
  validate: {
    enable: true,
    package: "egg-validate",
    //  https://github.com/node-modules/parameter/blob/master/README.md
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  
};
