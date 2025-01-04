module.exports = (app) => {
  const { controller, jwt, middleware } = app,
    liveRouter = app.router.namespace("/home");

  const userJwt = middleware.userJwt(jwt);
  const homeController = controller.client.home;

  liveRouter.get("/index", homeController.index);

  liveRouter.get("/check-login", userJwt, homeController.checkLogin);
};
