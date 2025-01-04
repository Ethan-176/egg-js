/* eslint valid-jsdoc: "off" */

module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  // 用于cookie签名的密钥，应更改为您自己的并保持安全
  config.logger = {
    level: "INFO",  // 日志级别
    dir: `${appInfo.baseDir}/logs`,
  };
  config.customLogger = {
    scheduleLogger: {
      file: `${appInfo.baseDir}/egg-schedule.log`, // 不生成文件
      level: "NONE", // 禁用日志
    },
  };
  config.cluster = {
    listen: {
      port: 7001,
      hostname: "127.0.0.1",
    },
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: "xxx.xx.xx.xx", // Redis host
      password: "", // Redis password
      db: 0,
    },
  };
  
  // 数据库连接信息
  config.sequelize = {
    logging: false,  // 是否打印sequelize日志
    dialect: "mysql",
    host: "", // 正式环境数据库地址
    port: 3306,
    username: "",
    password: "",
    database: "mysql", // 数据库名
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
