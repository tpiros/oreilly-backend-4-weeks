async function listDepartments(request, reply) {
  const employees = this.mongo.db.collection('employees');
  const result = await employees.distinct('department.name');
  return reply.send(result);
}

async function listDepartmentEmployees(request, reply) {
  const employees = this.mongo.db.collection('employees');
  const { deptName } = request.params;
  const result = await employees
    .find({
      'department.name': new RegExp(deptName, 'i'),
    })
    .toArray();
  if (result.length > 0) {
    return reply.send(result);
  }
  return reply.code(404).send({ message: `No employees for ${deptName}` });
}

module.exports = {
  listDepartments,
  listDepartmentEmployees,
};
