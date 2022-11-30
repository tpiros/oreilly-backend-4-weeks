const { ObjectId } = require('@fastify/mongodb');

const convertToObjectId = async (request, reply, next) => {
  const { id } = request.params;
  request.ObjectId = new ObjectId(id);
  next();
};

module.exports = convertToObjectId;
