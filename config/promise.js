Promise.prototype.defAnswer = function (res, errorStatus = 404) {
  this.then((data) => {
    if (Array.isArray(data)) {
      res.send(
        data.map((item) =>
          res.socket._httpMessage.req.method === "PUT" ? item : item.toJSON()
        )
      );
    } else res.send(data);
  }).catch((err) => res.status(errorStatus).send("Something went wrong"));
};
