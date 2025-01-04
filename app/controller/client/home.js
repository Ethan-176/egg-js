const Controller = require("../baseController");

class HomeController extends Controller {
  async index() {
    // const { app, ctx } = this;
    // const { $tools } = app;
    // const { } = ctx.model

    this.success("hi, egg");
  }

  async checkLogin() {
    // const { app, ctx } = this;
    // const { $tools } = app;
    // const { } = ctx.model

    this.success("hi, egg！");
  }
}

module.exports = HomeController;
