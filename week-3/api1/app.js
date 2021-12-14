const express = require('express');
const app = express();

const routes = require('./routes');
const middleware = require('./middleware');
app.use(express.json());

app.get('/', routes.displayAll);
app.get('/:id', middleware.checkIdParam, routes.displayOne);
app.post('/', routes.addPerson);
app.put('/:id', routes.fullUpdatePerson);
app.patch('/:id', routes.partialUpdatePerson);
app.delete('/:id', routes.deletePerson);

app.listen(3000, () => console.log('API running on port 3000'));
