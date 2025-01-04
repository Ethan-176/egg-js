module.exports = () => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization;

    if (!token) {
      ctx.body = {
        message: "令牌过期，请重新登录！",
        status: 401,
      };
      return;
    }
    ctx.status = 200;

    try {
      let result = await ctx.app.redis.get(token);

      if (!result) {
        ctx.body = {
          message: "令牌过期，请重新登录！",
          status: 401,
        };
        return;
      }

      result = JSON.parse(result);

      if (result.uid) return await next();

      ctx.body = {
        message: "令牌过期，请重新登录！",
        status: 401,
      };
    } catch (error) {
      const { status, message } = error;

      if (!status) ctx.logger.error("服务端内部抛出异常", error);

      ctx.body = {
        status: status || 500,
        message: status
          ? message || "网络超时，请稍后再试！"
          : "网络超时，请稍后再试！",
      };
    }
  };
};
