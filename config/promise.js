Promise.prototype.defAnswer = function (res, status = 404) {
  this.then((data) => {
    if (Array.isArray(data)) {
      res.send(
        data.map((item) =>
          res.socket._httpMessage.req.method === "PUT" ? item : item.toJSON()
        )
      );
    } else
      res.send(
        res.socket._httpMessage.req.method === "PUT" ? data : data.toJSON()
      );
  }).catch((err) => res.status(status).send("Something went wrong"));
};
