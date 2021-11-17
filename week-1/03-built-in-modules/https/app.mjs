import * as https from 'https';

let data = [];
https
  .get('https://swapi.dev/api/people/1', (res) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data.push(chunk);
    });
    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  })
  .on('error', (e) => {
    console.error(e);
  });
