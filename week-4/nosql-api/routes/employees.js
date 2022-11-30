// const { default: fastify } = require('fastify');
const {
  listEmployees,
  listOneEmployee,
  createEmployee,
  updateEmployee,
} = require('../controllers/employees');
const convertToObjectId = require('../middlewares/convertToObjectId');
async function routes(fastify) {
  fastify.get('/employees', listEmployees);
  fastify.get(
    '/employees/:id',
    { preHandler: convertToObjectId },
    listOneEmployee
  );
  fastify.post('/employees', createEmployee);
  fastify.patch(
    '/employees/:id',
    {
      preHandler: convertToObjectId,
    },
    updateEmployee
  );

  // setup fastify.delete()
}

module.exports = routes;
