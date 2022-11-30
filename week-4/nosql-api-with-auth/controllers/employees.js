const { ObjectId } = require('@fastify/mongodb');

async function listEmployees(request, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const result = await employeesCollection.find({}).toArray();
  return reply.send(result);
}

async function listOneEmployee(request, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const result = await employeesCollection.findOne({
    _id: request.ObjectId,
  });
  if (result) {
    return reply.send(result);
  }
  return reply.code(404).send({ message: 'Employee not found' });
}

async function createEmployee(request, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const employee = request.body;
  try {
    await employeesCollection.insertOne(employee);
    return reply.code(201).send({ message: 'Employee created ' });
  } catch (error) {
    return reply.send(error);
  }
}

async function updateEmployee(request, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const employee = request.body;
  if (employee) {
    try {
      await employeesCollection.updateOne(
        { _id: request.ObjectId },
        { $set: employee }
      );
      return reply.code(204).send();
    } catch (error) {
      return reply.send(error);
    }
  }
}

/*
Complete a delete
*/
async function deleteEmployee(req, reply) {
  // get the ObjectId (convert ID to ObjectID - use the middleware in routes/employees.js)
  // call deleteOne() on the collection
  // respond with 200 if deletion was successful
}

module.exports = {
  listEmployees,
  listOneEmployee,
  createEmployee,
  updateEmployee,
};
