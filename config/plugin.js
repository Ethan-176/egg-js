module.exports = {
  // 配置 路由拆分 egg-router-plus 前缀使用
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
  // ORM 框架
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  // redis 插件
  redis: {
    enable: true,
    package: "egg-redis",
  },
  validate: {
    enable: true,
    package: "egg-validate",
    // 使用示例  https://github.com/node-modules/parameter/blob/master/README.md
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
