let data = require('./data.json');

// GET
const displayAll = (req, res) => {
  if (!data) {
    return res.status(200).json([]);
  }
  return res.status(200).json(data);
};
// GET
const displayOne = (req, res) => {
  const { id } = req.params;
  const response = data.filter((d) => d.id === parseInt(id, 10));
  if (response.length === 0) {
    return res.status(404).json(`Person with id: ${id} cannot be found.`);
  }
  return res.status(200).json(response[0]);
};
// POST
const addPerson = (req, res) => {
  console.log(req.body);
  const { person } = req.body;
  if (person && person.constructor === Object) {
    data.push(person);
    return res.status(201).json(`Successfully added new person`);
  } else {
    return res
      .status(400)
      .json(
        `Person must be a valid object, provided: ${JSON.stringify(req.body)}`
      );
  }
};
// PUT
const fullUpdatePerson = (req, res) => {
  const { id } = req.params;
  const { person } = req.body;
  const personToUpdate = data.filter((d) => d.id === parseInt(id, 10))[0];
  const personIndex = data.findIndex((d) => d.fname === personToUpdate.fname);

  if (!personToUpdate) {
    data.push(person);
    return res.status(201).json(`Successfully added new person`);
  } else {
    data[personIndex] = person;
    return res.status(204).json(`Successfully updated person at id: ${id}`);
  }
};
// PATCH
const partialUpdatePerson = (req, res) => {
  const { id } = req.params;
  const personToUpdate = data.filter((d) => d.id === parseInt(id, 10))[0];
  const personIndex = data.findIndex((d) => d.fname === personToUpdate.fname);

  if (!personToUpdate) {
    return res.status(400).json(`Cannot find users with id ${id}`);
  } else {
    const { person } = req.body;

    if (
      Object.keys(personToUpdate).some((key) =>
        Object.keys(person).includes(key)
      )
    ) {
      data[personIndex] = Object.assign(personToUpdate, person);
      return res.status(204).send(`Success`);
    } else {
      return res
        .status(400)
        .json(`Some of the properties do not match "${Object.keys(person)}"`);
    }
  }
};
// DELETE
const deletePerson = (req, res) => {
  const { id } = req.params;
  data = data.filter((d) => d.id !== parseInt(id, 10));
  return res.status(204).json(`Success, ${id} deleted`);
};

module.exports = {
  displayAll,
  displayOne,
  addPerson,
  fullUpdatePerson,
  partialUpdatePerson,
  deletePerson,
};
