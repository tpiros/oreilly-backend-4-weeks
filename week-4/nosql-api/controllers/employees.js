const ObjectId = require('mongodb').ObjectId;

async function listEmployees(req, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const result = await employeesCollection.find({}).toArray();
  return reply.send(result);
}

async function listOneEmployee(req, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const result = await employeesCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  if (result) {
    return reply.send(result);
  }
  return reply.code(500).send({ message: 'Employee not found' });
}

async function createEmployee(req, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const employee = req.body;
  try {
    await employeesCollection.insertOne(employee);
    reply.code(201).send({ message: 'Employee successfully inserted' });
  } catch (error) {
    return reply.send(error);
  }
}

async function updateEmployee(req, reply) {
  const employeesCollection = this.mongo.db.collection('employees');
  const employee = req.body;
  if (employee) {
    try {
      await employeesCollection.updateOne(
        { _id: req.ObjectId },
        { $set: employee }
      ); // $set in MongoDB will do a partial document update
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
