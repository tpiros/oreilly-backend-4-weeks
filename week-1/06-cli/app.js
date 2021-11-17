require('dotenv').config();
// const args = process.argv;
// const args = process.argv.splice(2);
// const args = [...process.argv.splice(2)];
// args.forEach((arg) => console.log(arg));

// const readline = require('readline');

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);

// process.stdin.on('keypress', (key, data) => {
//   if (data.ctrl && data.name === 't') {
//     process.exit();
//   } else {
//     console.log('key', key);
//     console.log('data', data);
//   }
// });
// console.log('Press a key');
const readline = require('readline');
process.stdin.setRawMode(true);
readline.emitKeypressEvents(process.stdin);

const map = new Map();
map.set('b', 'Budapest');
map.set('h', 'Helsinki');
map.set('l', 'London');
map.set('r', 'Rome');
map.set('s', 'Stockholm');

console.log('Use the following key mappings or press ctrl-t to exit:');
for (const [key, value] of map.entries()) {
  console.log(`${key} = ${value}`);
}

function getWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API}&q=${city}`;
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        return reject(
          new Error('Failed to load page, status code: ' + response.statusCode)
        );
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        const data = body.join('');
        const parsed = JSON.parse(data);
        const returnMessage = `The weather in ${city} is ${parsed.main.temp}°C.`;
        return resolve(returnMessage);
      });
    });
    request.on('error', (err) => reject(err));
  });
}

function removeAndExceptLine() {
  process.stdin.removeListener('keypress', listener);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', async (input) => {
    const city = input;
    console.log(await getWeatherData(city));
    rl.close();
  });
}

async function listener(key, data) {
  if (data.ctrl && data.name === 't') {
    process.exit();
  } else {
    if (map.has(key)) {
      const city = map.get(key);
      console.log(await getWeatherData(city));
    } else {
      console.log(
        `"${key} is not defined as a key mapping. Please type in a city instead.`
      );
      removeAndExceptLine();
    }
  }
}

process.stdin.on('keypress', listener);
