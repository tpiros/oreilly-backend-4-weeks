const express = require('express');
const app = express();
const cors = require('cors');
// const employeeRouter = express.Router();
// const departmentRouter = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4000',
  })
);

const PORT = process.env.PORT || 3000;

// const middlewareFn = (req, res, next) => {
//   console.log(`Time of request: ${Date.now()}`);
//   next();
// };
// employeeRouter.use(middlewareFn);

// employeeRouter.get('/', (req, res) => {
//   res.send('Main route for employees');
// });

// employeeRouter.get('/department', (req, res) => {
//   res.send('Department for the employee');
// });

// departmentRouter.get('/', (req, res) => {
//   res.send('Main route for departments');
// });

// departmentRouter.get('/employees', (req, res) => {
//   res.send('List of all employees working for a department');
// });

// app.use('/employees', employeeRouter);
// app.use('/departments', departmentRouter);

// app.use(middlewareFn);
// app.route('/').get(routes.displayAll).post(routes.addPerson);

// app
//   .route('/:id')
//   .get(routes.displayOne)
//   .put(routes.fullUpdatePerson)
//   .patch(routes.partialUpdatePerson)
//   .delete(routes.deletePerson);

app.get('/', routes.displayAll);
app.get('/:id', middleware.checkIdParam, routes.displayOne);
app.post('/', routes.addPerson);
app.put('/:id', middleware.checkIdParam, routes.fullUpdatePerson);
app.patch('/:id', middleware.checkIdParam, routes.partialUpdatePerson);
app.delete('/:id', middleware.checkIdParam, routes.deletePerson);

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
