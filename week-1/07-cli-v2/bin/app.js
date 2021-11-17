#!/usr/bin/env node

(async () => {
  const yargs = require('yargs');
  const axios = require('axios');
  const chalk = require('chalk');

  const opts = yargs.usage('Usage: -c <Character Name>').option('c', {
    alias: 'character',
    describe: 'Name of Character',
    type: 'string',
    demandOption: true,
  }).argv;
  const urls = [
    'https://swapi.dev/api/people',
    'https://swapi.dev/api/people?page=2',
    'https://swapi.dev/api/people?page=3',
    'https://swapi.dev/api/people?page=4',
    'https://swapi.dev/api/people?page=5',
    'https://swapi.dev/api/people?page=6',
    'https://swapi.dev/api/people?page=7',
    'https://swapi.dev/api/people?page=8',
    'https://swapi.dev/api/people?page=9',
  ];
  const makeRequest = (url) => axios.get(url);
  const requests = urls.map(makeRequest);

  const responses = await Promise.all(requests);
  const characters = responses.map((response) => response.data.results).flat();
  const filmURLs = characters
    .filter((character) => {
      return character.name === opts.character;
    })
    .map((character) => {
      return character.films;
    })
    .flat();

  const filmRequests = filmURLs.map(makeRequest);
  const filmResponses = await Promise.all(filmRequests);
  const output = filmResponses
    .map((filmResponse) => filmResponse.data.title)
    .flat();
  console.log(
    `${chalk.yellow(opts.character)} appeared in ${chalk.green(
      output.join(', ')
    )}.`
  );
})();

// console.log('Hello!');

// const opts = yargs.usage('Usage: -l <lang>').option('l', {
//   alias: 'lang',
//   describe: 'language attribute',
//   type: 'string',
//   demandOption: true,
// }).argv;

// let greeting;
// if (opts.lang === 'en') {
//   greeting = 'Hi';
// } else if (opts.lang === 'es') {
//   greeting = 'Hola';
// } else {
//   greeting = 'Yo';
// }

// console.log(greeting);
