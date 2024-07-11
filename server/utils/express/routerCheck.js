const routerCheck = (router, methods) => {
  const dangerousMethods = [];

  router.stack.forEach((item) => {
    const routerMethod = Object.keys(item?.route?.methods).reduce(
      (accum, value) => (accum = value),
      ""
    );

    methods.forEach((item) => {
      if (item === routerMethod) dangerousMethods.push(routerMethod);
    });
  });

  return dangerousMethods;
};

module.exports = { routerCheck };
