const checkIdParam = (req, res, next) => {
  const id = +req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    res.header({ 'Content-Type': 'text/plain' });
    return res
      .status(500)
      .send(`ID must be an integer. You provided: ${typeof req.params.id}`);
  }
};

module.exports = {
  checkIdParam,
};
