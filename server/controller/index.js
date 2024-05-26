const { loadPrivateControllers } = require("./private");
const { loadPublicControllers } = require("./public");
const { jwtValidate } = require("@utils");

const bindControllers = (webServer) => {
  loadPrivateControllers.forEach((item) => {
    webServer.use(
      `/api/private/${item.controllerName}`,
      jwtValidate,
      item.router
    );
  });

  loadPublicControllers.forEach((item) => {
    webServer.use(`/api/${item.controllerName}`, item.router);
  });
};

module.exports = { bindControllers };
