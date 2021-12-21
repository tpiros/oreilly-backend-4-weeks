const { default: fastify } = require('fastify');
const {
  listEmployees,
  listOneEmployee,
  createEmployee,
  updateEmployee,
} = require('../controllers/employees');

const convertToObjectId = require('../middlewares/convertToObjectId');

async function routes(fastify, options) {
  fastify.get('/employees', listEmployees);
  fastify.get('/employees/:id', listOneEmployee);
  fastify.post('/employees', createEmployee);
  fastify.patch(
    '/employees/:id',
    { preHandler: convertToObjectId },
    updateEmployee
  );
}

module.exports = routes;
