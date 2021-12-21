const { ObjectId } = require('fastify-mongodb');

const convertToObjectId = async (request, reply, next) => {
  let { id } = request.params;
  request.ObjectId = new ObjectId(id);
  next();
};
module.exports = convertToObjectId;
