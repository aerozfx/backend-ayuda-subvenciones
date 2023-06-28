const manage404 = function (req, res, next) {
  res.status(404).redirect("/not-found");
};

module.exports = manage404;
