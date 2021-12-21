const ObjectID = require('mongodb').ObjectID;

async function listDepartments(req, reply) {
  const employees = this.mongo.db.collection('employees');
  const result = await employees.distinct('department.name');
  return reply.send(result);
}

async function listDepartmentEmployees(req, reply) {
  const employees = this.mongo.db.collection('employees');
  const { deptName } = req.params;
  const result = await employees
    .find({
      'department.name': new RegExp(deptName, 'i'),
    })
    .toArray();

  if (result) {
    return reply.send(result);
  }
  return reply
    .code(500)
    .send({ message: `No employees for department ${deptName}` });
}

module.exports = { listDepartments, listDepartmentEmployees };
