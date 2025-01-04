/* eslint valid-jsdoc: "off" */

module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.interfaceUrl = {
    // 本地化接口地址配置
    // local: "http://127.0.0.1:7003",
    // 线上接口地址配置
  };
  config.logger = {
    level: "INFO",
    dir: `${appInfo.baseDir}/logs`,
  };
  config.customLogger = {
    scheduleLogger: {
      file: `${appInfo.baseDir}/logs/egg-schedule.log`, // 不生成文件
      level: "NONE", // 禁用日志
    },
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: "127.0.0.1", // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    },
  };
  config.redis = {
    client: {
      // instanceName. See below
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      password: "",
      db: 0,
    },
  };

  config.sequelize = {
    logging: false, // 是否打印sequelize日志
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "1764753522",
    database: "mysql", // 数据库名称
    timezone: "+08:00", // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    define: {
      // 使用自定义的表名 否则会默认加上s
      freezeTableName: true,
      // 自动生成时间戳 -小驼峰式 会重复添加字段 所以false
      timestamps: false,
      // 表名小驼峰
      underscored: false,
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
