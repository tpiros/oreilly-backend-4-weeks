const {
  listDepartments,
  listDepartmentEmployees,
} = require('../controllers/departments');
const { authenticate } = require('../middlewares/auth');

async function routes(fastify, options) {
  fastify.get('/departments', { preHandler: authenticate }, listDepartments);
  fastify.get(
    '/departments/:deptName/employees',
    { preHandler: authenticate },
    listDepartmentEmployees
  );
}

module.exports = routes;
