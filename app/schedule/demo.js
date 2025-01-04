module.exports = {
  schedule: {
    interval: "1s", // 指定任务的执行间隔，这里是 1 秒
    type: "worker", // 会在所有的 worker 中随机选择一个 worker 执行任务。
    immediate: true, // 是否启动的时候需要执行第一次
    disable: true, //  是否禁用
    env: ["prod", "dev"], // 环境变量，只有在该环境变量下才会执行
  },
  async task(ctx) {
 
  },
};
