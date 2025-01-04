// 按照类的方式编写 Controller，不仅可以让我们更好的对 Controller 层代码进行抽象
// （例如将一些统一的处理抽象成一些私有方法），
// 还可以通过自定义 Controller 基类的方式封装应用中常用的方法。
const Controller = require("egg").Controller;

class BaseController extends Controller {
  success(data, timestamp) {
    const body = {};
    body.status = 200;
    body.message = "success";

    if (data) body.data = data;
    if (timestamp) body.timestamp = Date.now();

    this.ctx.body = body;
  }

  async warning(message, transaction) {
    this.ctx.body = {
      status: 400,
      ...(message?.msg ? { message: message.msg, info: message } : { message }),
    };

    transaction && (await transaction.rollback());
  }

  // 封装 redis 原子锁
  // const lockKey = `l_u_send_code_login:${mobile}`; // 锁用户发送登录验证码
  // await this.redisLockAcquired(lockKey, 60);
  async redisLockAcquired(lockKey, duration = 120) {
    const { redis } = this.app;
    // 通过 NX（仅在键不存在时设置）
    const Lock = await redis.set(lockKey, "locked", "NX", "EX", duration);

    if (!Lock) throw { message: "正在处理中，请稍后重试！", status: 503 };

    return Lock;
  }
}

module.exports = BaseController;
