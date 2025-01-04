const socketIo = require("socket.io");
const rootDirectoryPath = process.cwd();
const $tools = require(`${rootDirectoryPath}/app/extend/helper.js`);

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.$tools = $tools;
    
    this.handleRequest = this.handleRequest.bind(this);
    
    app.on("request", this.handleRequest);
  }
  
  handleRequest(ctx) {
    const validateQuery = (field, rules, defaultValue) => {
      const value = ctx.request.query[field] || defaultValue;
      try {
        ctx.validate({ [field]: rules }, { [field]: value });
        return value;
      } catch (err) {
        // ctx.logger.warn(`${field} is invalid`, err.errors);
        ctx.request.url = "/404";
      }
    };
    
    ctx.request.query.pageIndex = validateQuery(
        "pageIndex",
        { type: "int", convertType: "number", min: 1 },
        1,
    );
    
    ctx.request.query.pageSize = validateQuery(
        "pageSize",
        { type: "int", convertType: "number", max: 100 },
        10,
    );
  }
  
  async didLoad() {
    const env = this.app.config?.env;
    const { model, logger } = this.app;
    
    if (["productionModel", "localModel"].includes(env)) {
      logger.info("同步数据库模式");
      
      try {
        await model.sync({ alter: true });
        
        logger.info("数据库同步完成");
      } catch (e) {
        logger.error("同步数据库失败:", e);
      }
    }
  }
  
  async didReady() {
    this.initializeSocketIo();
  }
  
  initializeSocketIo() {
    const app = this.app;
    
    app.$io = socketIo(app.server, {
      cors: {
        origin: [], // Change to your domain
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });
    
    app.$io.on("connection", (socket) => {
      this.handleSocketEvents(socket);
    });
  }
  
  handleSocketEvents(socket) {
 
  }
}

module.exports = AppBootHook;
