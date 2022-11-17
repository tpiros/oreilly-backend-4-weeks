let data = require('./data.json');

/*
  Rate limiting
  - register to use the API -> API KEY
  - API limiting per hour, per day, per week
*/
const apiKeyList = ['123', '456']; // -> belong to a registered user
let apiRateLimit = 10;
const displayAll = (req, res) => {
  if (req.headers['x-api-key']) {
    const apiKey = req.headers['x-api-key'];
    if (apiKeyList.includes(apiKey)) {
      apiRateLimit--;
      if (apiRateLimit <= 0) {
        return res.json('Number of daily API requests reached');
      }
      return res.json({ data, remainingNumberOfRequests: apiRateLimit });
    } else {
      return res.json('Invalid API key');
    }
  } else {
    return res.json('Please use API key');
  }
};

// const displayAll = (req, res) => {
//   if (req.headers['x-version']) {
//     const version = req.headers['x-version'];
//     if (version === 'version-2') {
//       return res.json({ data, requestedAt: Date.now() });
//     }
//   }
//   if (!data) {
//     return res.status(200).json([]);
//   }
//   return res.json(data);
// };

const displayOne = (req, res) => {
  const { id } = req.params;
  let [response] = data.filter((d) => d.id === parseInt(id, 10));
  if (!response) {
    res.header({ 'Content-Type': 'text/plain' });
    return res.status(404).send(`Person with id: ${id} cannot be found.`);
  }
  if (req.query && req.query.version) {
    const { version } = req.query;
    if (version === 'v2') {
      return res.json({ response, requestedAt: Date.now() });
    }
  } else {
    return res.json(response);
  }
};

const addPerson = (req, res) => {
  const payload = req.body;
  if (payload) {
    data.push(payload);
    res.header({ 'Content-Type': 'text/plain' });
    return res.status(201).send('Success!');
  } else {
    //
  }
  return res.json();
};

const fullUpdatePerson = (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const [personToUpdate] = data.filter((d) => d.id === parseInt(id, 10));

  if (!personToUpdate) {
    data.push(payload);
    res.header({ 'Content-Type': 'text/plain' });
    return res.status(201).send('Success!');
  } else {
    const personIndex = data.findIndex((d) => d.fname === personToUpdate.fname);
    data[personIndex] = payload;
    return res.status(204).end();
  }
};

const partialUpdatePerson = (req, res) => {
  const { id } = req.params;
  const [personToUpdate] = data.filter((d) => d.id === parseInt(id, 10));
  if (!personToUpdate) {
    res.header({ 'Content-Type': 'text/plain' });
    return res.status(404).send(`Cannot find user with id: ${id}`);
  } else {
    const payload = req.body;
    if (
      Object.keys(personToUpdate).some((key) =>
        Object.keys(payload).includes(key)
      )
    ) {
      const personIndex = data.findIndex(
        (d) => d.fname === personToUpdate.fname
      );
      data[personIndex] = Object.assign(personToUpdate, payload);
      return res.status(204).end();
    } else {
      // do appendt the property to personToUpdate
      res.header({ 'Content-Type': 'text/plain' });
      return res
        .status(500)
        .send(`Some of the properties do not match: "${Object.keys(payload)}"`);
    }
  }
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  data = data.filter((d) => d.id !== parseInt(id, 10));
  return res.status(204).end();
};

module.exports = {
  displayAll,
  displayOne,
  addPerson,
  fullUpdatePerson,
  partialUpdatePerson,
  deletePerson,
};
