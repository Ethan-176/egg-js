module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 自定义错误响应，去除 stack 和 name 字段
      const { status, message } = err || {};

      if (!status) ctx.logger.error("服务端内部抛出异常", err);

      ctx.body = {
        status: status || 400,
        message: status
          ? message || "网络超时，请稍后再试！"
          : "网络超时，请稍后再试！",
      };
    }
  };
};
