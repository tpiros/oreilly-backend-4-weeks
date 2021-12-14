import { data } from './data.js';

const listAllCountries = (req, res) => {
  return res.send(data);
};

const listOneCountry = (req, res) => {
  const id = +req.params.id;
  const [country] = data.filter((d) => d.id === id);
  return res.send({
    country,
  });
};

const listOneCountryV2 = (req, res) => {
  const id = +req.params.id;
  const [country] = data.filter((d) => d.id === id);
  return res.send({
    reqestedAt: new Date(),
    country,
  });
};

const getCityInfo = (req, res) => {
  const country = req.params.country;
  const city = data.filter((d) => d.country === country);
  return res.send(city);
};

export { listAllCountries, listOneCountry, listOneCountryV2, getCityInfo };
