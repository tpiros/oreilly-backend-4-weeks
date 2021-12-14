const checkIdParam = (req, res, next) => {
  const id = +req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    return res
      .status(400)
      .json(`ID must be an integer. You provided ${typeof req.params.id}`);
  }
};

module.exports = {
  checkIdParam,
};
